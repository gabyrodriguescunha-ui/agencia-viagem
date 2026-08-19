import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { Reserva } from "../../../models/reserva";
import { ReservaService } from "../../../services/reserva.service";
import { Financeiro } from "./financeiro";

describe("Financeiro", () => {
  let component: Financeiro;
  let fixture: ComponentFixture<Financeiro>;

  // Lista controlada que permite conferir todos os cálculos financeiros.
  const reservasTeste: Reserva[] = [
    {
      id: 1,
      criadaEm: "2026-08-19T10:00:00.000Z",
      roteiro: { id: 1, nome: "Tóquio Otaku", cidade: "Tóquio", preco: 1000 },
      data: "Março de 2027",
      viajantes: 2,
      nome: "Cliente Confirmado",
      cpf: "11111111111",
      email: "confirmado@teste.com",
      telefone: "(22) 99999-0001",
      formaPagamento: "pix",
      parcelas: 1,
      valorTotal: 2000,
      status: "Confirmada",
    },
    {
      id: 2,
      criadaEm: "2026-08-19T11:00:00.000Z",
      roteiro: { id: 2, nome: "Japão em Cena", cidade: "Kamakura", preco: 3000 },
      data: "Abril de 2027",
      viajantes: 1,
      nome: "Segundo Confirmado",
      cpf: "22222222222",
      email: "segundo@teste.com",
      telefone: "(22) 99999-0002",
      formaPagamento: "cartao",
      parcelas: 3,
      valorTotal: 3000,
      status: "Confirmada",
    },
    {
      id: 3,
      criadaEm: "2026-08-19T12:00:00.000Z",
      roteiro: { id: 3, nome: "Mundos Temáticos", cidade: "Osaka", preco: 4000 },
      data: "Julho de 2027",
      viajantes: 1,
      nome: "Cliente Pendente",
      cpf: "33333333333",
      email: "pendente@teste.com",
      telefone: "(22) 99999-0003",
      formaPagamento: "boleto",
      parcelas: 1,
      valorTotal: 4000,
      status: "Pendente",
    },
    {
      id: 4,
      criadaEm: "2026-08-19T13:00:00.000Z",
      roteiro: { id: 1, nome: "Tóquio Otaku", cidade: "Tóquio", preco: 1500 },
      data: "Maio de 2027",
      viajantes: 1,
      nome: "Cliente Cancelado",
      cpf: "44444444444",
      email: "cancelado@teste.com",
      telefone: "(22) 99999-0004",
      formaPagamento: "pix",
      parcelas: 1,
      valorTotal: 1500,
      status: "Cancelada",
    },
  ];

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Financeiro],
      providers: [
        provideRouter([]),
        {
          provide: ReservaService,
          useValue: { listar: () => reservasTeste },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Financeiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve somar somente as reservas confirmadas", () => {
    expect((component as any).totalRecebido).toBe(5000);
  });

  it("deve calcular os valores pendentes", () => {
    expect((component as any).totalPendente).toBe(4000);
  });

  it("deve calcular os valores cancelados", () => {
    expect((component as any).totalCancelado).toBe(1500);
  });

  it("deve calcular o ticket médio das reservas confirmadas", () => {
    expect((component as any).ticketMedio).toBe(2500);
  });

  it("deve formatar a forma de pagamento do cartão", () => {
    expect((component as any).formatarPagamento(reservasTeste[1])).toBe(
      "Cartão em 3x",
    );
  });
});