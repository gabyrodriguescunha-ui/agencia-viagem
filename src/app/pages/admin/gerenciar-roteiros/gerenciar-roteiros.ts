import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MenuAdmin } from "../menu-admin/menu-admin";
import { Roteiro } from "../../../models/roteiro";
import { RoteiroService } from "../../../services/roteiro.service";

@Component({
  selector: "app-gerenciar-roteiros",
  imports: [FormsModule, MenuAdmin],
  templateUrl: "./gerenciar-roteiros.html",
  styleUrl: "./gerenciar-roteiros.css",
})
export class GerenciarRoteiros {
  // Injeta a mesma fonte de dados usada pelo site público.
  private readonly roteiroService = inject(RoteiroService);

  // Disponibiliza a lista reativa para a tabela.
  protected readonly roteiros = this.roteiroService.roteiros;
  protected formularioAberto = false;
  protected formulario: Roteiro = this.criarFormularioVazio();
  protected imagemPreview = "";
  protected erroImagem = "";

  // Abre o formulário para um novo cadastro.
  protected novoRoteiro(): void {
    this.formulario = this.criarFormularioVazio();
    this.imagemPreview = "";
    this.erroImagem = "";
    this.formularioAberto = true;
  }

  // Copia o roteiro para que a edição não altere a tabela antes de salvar.
  protected editar(roteiro: Roteiro): void {
    this.formulario = structuredClone(roteiro);
    this.imagemPreview = roteiro.imagem;
    this.erroImagem = "";
    this.formularioAberto = true;
  }

  // Lê a imagem selecionada no computador e a transforma em Base64.
  protected selecionarImagem(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    this.erroImagem = "";

    if (!arquivo) {
      return;
    }

    // Aceita apenas arquivos de imagem.
    if (!arquivo.type.startsWith("image/")) {
      this.erroImagem = "Selecione um arquivo de imagem válido.";
      input.value = "";
      return;
    }

    // Impede que uma imagem maior que 1 MB seja armazenada no LocalStorage.
    const tamanhoMaximo = 1024 * 1024;

    if (arquivo.size > tamanhoMaximo) {
      this.erroImagem = "A imagem deve possuir no máximo 1 MB.";
      input.value = "";
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      const imagemBase64 = leitor.result as string;

      this.formulario.imagem = imagemBase64;
      this.imagemPreview = imagemBase64;
    };

    leitor.readAsDataURL(arquivo);
  }

  // Salva o cadastro ou a edição por meio do serviço.
  protected salvar(): void {
    if (!this.formulario.imagem) {
      this.erroImagem = "Selecione uma imagem para o roteiro.";
      return;
    }

    this.roteiroService.salvar(this.formulario);
    this.cancelar();
  }

  // Pede confirmação antes de remover um roteiro.
  protected excluir(roteiro: Roteiro): void {
    if (confirm(`Deseja excluir o roteiro ${roteiro.nome}?`)) {
      this.roteiroService.excluir(roteiro.id);
    }
  }

  // Fecha e limpa o formulário.
  protected cancelar(): void {
    this.formularioAberto = false;
    this.formulario = this.criarFormularioVazio();
    this.imagemPreview = "";
    this.erroImagem = "";
  }

  // Formata o valor exibido na tabela.
  protected formatarPreco(preco: number): string {
    return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  // Monta a estrutura de um novo roteiro.
  private criarFormularioVazio(): Roteiro {
    return {
      id: 0, nome: "", descricao: "", cidade: "", duracao: "", preco: 0,
      vagas: 0, imagem: "", categoria: "", datas: [], incluidos: [],
      itinerario: [], perguntas: [],
    };
  }
}