import { TestBed } from "@angular/core/testing";
import { Roteiro } from "../models/roteiro";
import { RoteiroService } from "./roteiro.service";

describe("RoteiroService", () => {
  let service: RoteiroService;

  // Cria um roteiro válido para os testes de cadastro e edição.
  const criarRoteiro = (): Roteiro => ({
    id: 0,
    nome: "Kyoto Histórico",
    descricao: "Passeio pelos templos e bairros tradicionais de Kyoto.",
    cidade: "Kyoto",
    duracao: "5 dias e 4 noites",
    preco: 10990,
    vagas: 15,
    imagem: "images/kyoto-historico.png",
    categoria: "História e cultura",
    datas: ["10 a 14 de abril de 2027"],
    incluidos: ["Hospedagem", "Guia em português"],
    itinerario: [
      {
        dia: "Dia 1",
        titulo: "Chegada",
        descricao: "Recepção do grupo em Kyoto.",
      },
    ],
    perguntas: [
      {
        pergunta: "O passeio possui guia?",
        resposta: "Sim, haverá guia em português.",
      },
    ],
  });

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoteiroService);
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve carregar os roteiros iniciais", () => {
    expect(service.roteiros().length).toBe(3);
  });

  it("deve buscar um roteiro pelo id", () => {
    const roteiro = service.buscarPorId(1);

    expect(roteiro?.nome).toBe("Tóquio Otaku");
  });

  it("deve cadastrar um novo roteiro", () => {
    service.salvar(criarRoteiro());

    expect(service.roteiros().length).toBe(4);
    expect(service.roteiros()[3].nome).toBe("Kyoto Histórico");
    expect(service.roteiros()[3].id).toBe(4);
  });

  it("deve atualizar um roteiro existente", () => {
    const roteiroEditado = {
      ...service.roteiros()[0],
      vagas: 20,
    };

    service.salvar(roteiroEditado);

    expect(service.buscarPorId(1)?.vagas).toBe(20);
  });

  it("deve excluir um roteiro", () => {
    service.excluir(1);

    expect(service.buscarPorId(1)).toBeUndefined();
    expect(service.roteiros().length).toBe(2);
  });
});
