import { Injectable, signal } from "@angular/core";
import { Roteiro } from "../models/roteiro";

// Nome utilizado para guardar os roteiros no navegador.
const CHAVE_ROTEIROS = "sakura-trip-roteiros";

// Lista inicial usada apenas quando ainda não existem dados salvos.
const ROTEIROS_INICIAIS: Roteiro[] = [
  {
    id: 1,
    nome: "Tóquio Otaku",
    descricao: "Explore Akihabara, cafés temáticos e lojas de mangás e colecionáveis.",
    cidade: "Tóquio",
    duracao: "7 dias e 6 noites",
    preco: 14890,
    vagas: 12,
    imagem: "images/toquio-otaku.png",
    categoria: "Compras e cultura otaku",
    datas: ["15 a 21 de março de 2027", "10 a 16 de maio de 2027"],
    incluidos: ["Hospedagem com café da manhã", "Transporte durante os passeios", "Guia em português"],
    itinerario: [
      { dia: "Dia 1", titulo: "Chegada a Tóquio", descricao: "Recepção, traslado e apresentação do roteiro." },
      { dia: "Dia 2", titulo: "Akihabara", descricao: "Lojas de mangás, eletrônicos e máquinas de gashapon." },
    ],
    perguntas: [{ pergunta: "Preciso falar japonês?", resposta: "Não. O grupo terá guia em português." }],
  },
  {
    id: 2,
    nome: "Japão em Cena",
    descricao: "Visite locais reais que inspiraram cenários conhecidos de animes.",
    cidade: "Tóquio e Kamakura",
    duracao: "6 dias e 5 noites",
    preco: 13290,
    vagas: 8,
    imagem: "images/japao-em-cena.png",
    categoria: "Cenários e fotografia",
    datas: ["5 a 10 de abril de 2027", "8 a 13 de setembro de 2027"],
    incluidos: ["Hospedagem com café da manhã", "Viagens de trem previstas", "Seguro-viagem"],
    itinerario: [
      { dia: "Dia 1", titulo: "Chegada", descricao: "Recepção e encontro com o guia." },
      { dia: "Dia 2", titulo: "Tóquio cinematográfica", descricao: "Passeio por ruas e santuários." },
    ],
    perguntas: [{ pergunta: "Preciso ter câmera profissional?", resposta: "Não. Um celular também pode ser usado." }],
  },
  {
    id: 3,
    nome: "Mundos Temáticos",
    descricao: "Conheça parques, museus e atrações imersivas da cultura pop japonesa.",
    cidade: "Tóquio, Nagoya e Osaka",
    duracao: "9 dias e 8 noites",
    preco: 18990,
    vagas: 10,
    imagem: "images/mundos-tematicos.png",
    categoria: "Parques e experiências",
    datas: ["10 a 18 de julho de 2027", "6 a 14 de novembro de 2027"],
    incluidos: ["Hospedagem com café da manhã", "Transporte entre as cidades", "Ingressos principais"],
    itinerario: [
      { dia: "Dias 1 e 2", titulo: "Tóquio", descricao: "Museus interativos e experiências digitais." },
      { dia: "Dias 3 e 4", titulo: "Nagoya", descricao: "Parque temático e lojas oficiais." },
    ],
    perguntas: [{ pergunta: "Os ingressos estão incluídos?", resposta: "Os ingressos informados no roteiro estão incluídos." }],
  },
];

@Injectable({ providedIn: "root" })
export class RoteiroService {
  // O signal permite que as telas acompanhem as alterações da lista.
  private readonly estadoRoteiros = signal<Roteiro[]>(this.carregar());
  readonly roteiros = this.estadoRoteiros.asReadonly();

  // Procura um roteiro pelo id recebido na URL.
  buscarPorId(id: number): Roteiro | undefined {
    return this.estadoRoteiros().find((roteiro) => roteiro.id === id);
  }

  // Cadastra um novo roteiro ou atualiza um roteiro existente.
  salvar(dados: Roteiro): void {
    const lista = this.estadoRoteiros();
    const existe = lista.some((roteiro) => roteiro.id === dados.id);
    const atualizada = existe
      ? lista.map((roteiro) => roteiro.id === dados.id ? dados : roteiro)
      : [...lista, { ...dados, id: this.proximoId() }];

    this.atualizar(atualizada);
  }

  // Remove o roteiro selecionado.
  excluir(id: number): void {
    this.atualizar(this.estadoRoteiros().filter((roteiro) => roteiro.id !== id));
  }

  // Recupera os dados salvos ou devolve a lista inicial.
  private carregar(): Roteiro[] {
    const conteudo = localStorage.getItem(CHAVE_ROTEIROS);
    return conteudo ? JSON.parse(conteudo) : ROTEIROS_INICIAIS;
  }

  // Atualiza a aplicação e o armazenamento do navegador.
  private atualizar(roteiros: Roteiro[]): void {
    this.estadoRoteiros.set(roteiros);
    localStorage.setItem(CHAVE_ROTEIROS, JSON.stringify(roteiros));
  }

  // Calcula o próximo identificador disponível.
  private proximoId(): number {
    return Math.max(0, ...this.estadoRoteiros().map((roteiro) => roteiro.id)) + 1;
  }
}
