import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { Funcionario } from "../../../models/funcionario";
import { Reserva } from "../../../models/reserva";
import { FuncionarioService } from "../../../services/funcionario.service";
import { ReservaService } from "../../../services/reserva.service";
import { RoteiroService } from "../../../services/roteiro.service";
import { Dashboard } from "./dashboard";

describe("Dashboard", () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  // Reservas controladas utilizadas nos indicadores do dashboard.
  const reservasTeste: Reserva[] = [
    {
      id: 1,
      criadaEm: "2026-08-18T10:00:00.000Z",
      roteiro: { id: 1, nome: "Tóquio Otaku", cidade: "Tóquio", preco: 2000 },
      data: "Março de 2027",
      viajantes: 1,
      nome: "Cliente Pendente",
      cpf: "11111111111",
      email: "pendente@teste.com",
      telefone: "(22) 99999-0001",
      formaPagamento: "pix",
      parcelas: 1,
      valorTotal: 2000,
      status: "Pendente",
    },
    {
      id: 2,
      criadaEm: "2026-08-19T10:00:00.000Z",
      roteiro: { id: 2, nome: "Japão em Cena", cidade: "Kamakura", preco: 5000 },
      data: "Abril de 2027",
      viajantes: 1,
      nome: "Cliente Confirmado",
      cpf: "22222222222",
      email: "confirmado@teste.com",
      telefone: "(22) 99999-0002",
      formaPagamento: "cartao",
      parcelas: 2,
      valorTotal: 5000,
      status: "Confirmada",
    },
  ];

  // Funcionários controlados usados para testar a quantidade de ativos.
  const funcionariosTeste: Funcionario[] = [
    {
      id: 1,
      nome: "Funcionário Ativo",
      cargo: "Atendimento",
      email: "ativo@teste.com",
      telefone: "(22) 99999-1001",
      ativo: true,
      cadastradoEm: "2026-08-18T10:00:00.000Z",
    },
    {
      id: 2,
      nome: "Funcionário Inativo",
      cargo: "Financeiro",
      email: "inativo@teste.com",
      telefone: "(22) 99999-1002",
      ativo: false,
      cadastradoEm: "2026-08-18T10:00:00.000Z",
    },
  ];

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        {
          provide: ReservaService,
          useValue: { listar: () => reservasTeste },
        },
        {
          provide: RoteiroService,
          useValue: { roteiros: signal([{}, {}, {}]) },
        },
        {
          provide: FuncionarioService,
          useValue: { funcionarios: signal(funcionariosTeste) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve contar as reservas pendentes", () => {
    expect((component as any).reservasPendentes).toBe(1);
  });

  it("deve contar as reservas confirmadas", () => {
    expect((component as any).reservasConfirmadas).toBe(1);
  });

  it("deve somar o faturamento das reservas confirmadas", () => {
    expect((component as any).faturamentoConfirmado).toBe(5000);
  });

  it("deve contar somente os funcionários ativos", () => {
    expect((component as any).funcionariosAtivos).toBe(1);
  });

  it("deve ordenar as reservas da mais recente para a mais antiga", () => {
    const recentes = (component as any).reservasRecentes as Reserva[];

    expect(recentes[0].id).toBe(2);
    expect(recentes[1].id).toBe(1);
  });
});