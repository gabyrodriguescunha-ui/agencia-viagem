import { TestBed } from "@angular/core/testing";
import { Reserva } from "../models/reserva";
import { ReservaService } from "./reserva.service";

describe("ReservaService", () => {
  let service: ReservaService;

  // Cria uma reserva válida que pode ser reutilizada nos testes.
  const criarReserva = (id = 1): Reserva => ({
    id,
    criadaEm: "2026-08-19T10:00:00.000Z",
    roteiro: {
      id: 1,
      nome: "Tóquio Otaku",
      cidade: "Tóquio",
      preco: 14890,
    },
    data: "15 a 21 de março de 2027",
    viajantes: 2,
    nome: "Cliente Teste",
    cpf: "12345678900",
    email: "cliente@teste.com",
    telefone: "(22) 99999-0000",
    formaPagamento: "pix",
    parcelas: 1,
    valorTotal: 29780,
    status: "Pendente",
  });

  beforeEach(() => {
    // Impede que os dados reais do navegador interfiram nos testes.
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaService);
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve começar com a lista vazia", () => {
    expect(service.listar()).toEqual([]);
  });

  it("deve salvar uma reserva no localStorage", () => {
    service.salvar(criarReserva());

    expect(service.listar().length).toBe(1);
    expect(service.listar()[0].nome).toBe("Cliente Teste");
    expect(localStorage.getItem("sakura-trip-reservas")).not.toBeNull();
  });

  it("deve alterar o status de uma reserva", () => {
    service.salvar(criarReserva());

    const atualizadas = service.alterarStatus(1, "Confirmada");

    expect(atualizadas[0].status).toBe("Confirmada");
    expect(service.listar()[0].status).toBe("Confirmada");
  });

  it("deve excluir uma reserva", () => {
    service.salvar(criarReserva());

    const atualizadas = service.excluir(1);

    expect(atualizadas).toEqual([]);
    expect(service.listar()).toEqual([]);
  });

  it("deve retornar lista vazia quando o localStorage estiver inválido", () => {
    localStorage.setItem("sakura-trip-reservas", "conteudo-invalido");

    expect(service.listar()).toEqual([]);
  });
});
