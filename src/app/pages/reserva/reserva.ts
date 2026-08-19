import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Cabecalho } from "../../components/cabecalho/cabecalho";
import { Reserva as ReservaModel } from "../../models/reserva";
import { ReservaService } from "../../services/reserva.service";

// Define as informações de um roteiro utilizadas na reserva.
interface RoteiroReserva {
  // Identificador único do roteiro.
  id: number;
  // Nome apresentado no resumo da reserva.
  nome: string;
  // Cidade ou cidades visitadas.
  cidade: string;
  // Preço individual do pacote.
  preco: number;
  // Quantidade máxima de vagas disponíveis.
  vagas: number;
  // Datas disponíveis para a viagem.
  datas: string[];
}

@Component({
  selector: "app-reserva",
  imports: [
    Cabecalho,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./reserva.html",
  styleUrl: "./reserva.css",
})
export class Reserva {
  // Permite acessar os parâmetros presentes na URL.
  private readonly rota = inject(ActivatedRoute);
  // Auxilia na criação do formulário reativo.
  private readonly formBuilder = inject(FormBuilder);

  // Injeta o serviço responsável por gerenciar as reservas.
  private readonly reservaService = inject(ReservaService);
  // Armazena os roteiros que podem ser reservados.
  private readonly roteiros: RoteiroReserva[] = [
    {
      id: 1,
      nome: "Tóquio Otaku",
      cidade: "Tóquio",
      preco: 14890,
      vagas: 12,
      datas: [
        "15 a 21 de março de 2027",
        "10 a 16 de maio de 2027",
      ],
    },
    {
      id: 2,
      nome: "Japão em Cena",
      cidade: "Tóquio e Kamakura",
      preco: 13290,
      vagas: 8,
      datas: [
        "5 a 10 de abril de 2027",
        "8 a 13 de setembro de 2027",
      ],
    },
    {
      id: 3,
      nome: "Mundos Temáticos",
      cidade: "Tóquio, Nagoya e Osaka",
      preco: 18990,
      vagas: 10,
      datas: [
        "10 a 18 de julho de 2027",
        "6 a 14 de novembro de 2027",
      ],
    },
  ];

  // Recupera o id presente no endereço da página.
  private readonly id = Number(
    this.rota.snapshot.paramMap.get("id"),
  );
  // Procura o roteiro cujo id corresponde ao id da URL.
  // Caso nenhum roteiro seja encontrado, o resultado será undefined.
  protected readonly roteiro = this.roteiros.find(
    (item) => item.id === this.id,
  );
  // Controla a exibição da mensagem de reserva concluída.
  protected reservaConfirmada = false;
  // Define as quantidades de parcelas disponíveis no cartão.
  protected readonly opcoesParcelas = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ];
  // Cria o formulário reativo e define suas validações.
  protected readonly reservaForm = this.formBuilder.group({
    // Data escolhida para realizar a viagem.
    data: [
      "",
      Validators.required,
    ],
    // Quantidade de pessoas que participarão da viagem.
    viajantes: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(this.roteiro?.vagas ?? 1),
      ],
    ],
    // Nome completo da pessoa responsável pela reserva.
    nome: [
      "",
      [
        Validators.required,
        Validators.minLength(3),
      ],
    ],
    // CPF obrigatório contendo exatamente 11 números.
    cpf: [
      "",
      [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ],
    ],
    // E-mail obrigatório e com formato válido.
    email: [
      "",
      [
        Validators.required,
        Validators.email,
      ],
    ],
    // Telefone obrigatório contendo 10 ou 11 números.
    telefone: [
      "",
      [
        Validators.required,
        Validators.pattern(/^\d{10,11}$/),
      ],
    ],
    // Forma escolhida para realizar o pagamento.
    formaPagamento: [
      "",
      Validators.required,
    ],
    // Quantidade de parcelas utilizada no cartão.
    parcelas: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ],
    ],
  });
  // Calcula o valor da reserva sempre que a quantidade muda.
  protected get valorTotal(): number {
    // Recupera a quantidade preenchida no formulário.
    const quantidade = Number(
      this.reservaForm.controls.viajantes.value,
    );
    // Multiplica o preço individual pela quantidade de viajantes.
    // Caso o roteiro não exista, utiliza zero como preço.
    return (this.roteiro?.preco ?? 0) * quantidade;
  }
  // Calcula o valor de cada parcela do cartão.
  protected get valorParcela(): number {
    // Recupera a quantidade de parcelas selecionada.
    const quantidadeParcelas = Number(
      this.reservaForm.controls.parcelas.value,
    );
    // Divide o valor total pela quantidade de parcelas.
    // Math.max impede que ocorra uma divisão por zero.
    return this.valorTotal / Math.max(quantidadeParcelas, 1);
  }
  // Retorna o nome da forma de pagamento para exibição no HTML.
  protected get nomeFormaPagamento(): string {
    // Recupera a opção selecionada no formulário.
    const formaPagamento =
      this.reservaForm.controls.formaPagamento.value;
    // Retorna o texto correspondente a cada opção.
    if (formaPagamento === "pix") {
      return "Pix";
    }

    if (formaPagamento === "cartao") {
      return `Cartão de crédito em ${this.reservaForm.controls.parcelas.value}x`;
    }

    if (formaPagamento === "boleto") {
      return "Boleto";
    }

    // Retorna um texto vazio enquanto nenhuma opção estiver selecionada.
    return "";
  }
  // Converte um número para o formato da moeda brasileira.
  protected formatarPreco(preco: number): string {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  // Monta uma nova reserva usando os dados do formulário.
  private criarReserva(): ReservaModel | undefined {
    // Impede o salvamento caso o roteiro não tenha sido encontrado.
    if (!this.roteiro) {
      return undefined;
    }
    // Recupera todos os valores preenchidos no formulário.
    const dadosFormulario = this.reservaForm.getRawValue();
    // Monta o objeto que será armazenado no navegador.
    const novaReserva: ReservaModel = {
      // Date.now cria um identificador usando o horário atual.
      id: Date.now(),
      // Salva a data e o horário no formato internacional.
      criadaEm: new Date().toISOString(),
      
      roteiro: {
        id: this.roteiro.id,
        nome: this.roteiro.nome,
        cidade: this.roteiro.cidade,
        preco: this.roteiro.preco,
      },

      data: dadosFormulario.data ?? "",
      viajantes: Number(dadosFormulario.viajantes ?? 1),
      nome: dadosFormulario.nome ?? "",
      cpf: dadosFormulario.cpf ?? "",
      email: dadosFormulario.email ?? "",
      telefone: dadosFormulario.telefone ?? "",
      formaPagamento: dadosFormulario.formaPagamento ?? "",
      parcelas: Number(dadosFormulario.parcelas ?? 1),
      valorTotal: this.valorTotal,

      // Toda nova reserva começa com o status Pendente.
      status: "Pendente",
    };

    // Retorna a reserva pronta para ser salva pelo serviço.
    return novaReserva;
  }

  // É executado quando o formulário é enviado.
  protected confirmarReserva(): void {
    // Verifica se algum campo do formulário está inválido.
    if (this.reservaForm.invalid) {
      // Marca todos os campos para exibir os erros.
      this.reservaForm.markAllAsTouched();

      // Interrompe o método e impede a confirmação.
      return;
    }

    // Cria a reserva usando os dados preenchidos.
    const reservaSalva = this.criarReserva();

    // Interrompe o método caso o roteiro não tenha sido encontrado.
    if (!reservaSalva) {
      return;
    }

    // Envia a reserva para o serviço responsável pelo localStorage.
    this.reservaService.salvar(reservaSalva);

    // Exibe no console os mesmos dados que foram armazenados.
    console.log(reservaSalva);

    // Esconde o formulário e exibe a mensagem de sucesso.
    this.reservaConfirmada = true;
  }
}