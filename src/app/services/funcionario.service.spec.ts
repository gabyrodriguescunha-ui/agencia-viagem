import { TestBed } from "@angular/core/testing";
import { Funcionario } from "../models/funcionario";
import { FuncionarioService } from "./funcionario.service";

describe("FuncionarioService", () => {
  let service: FuncionarioService;

  // Cria um funcionário válido para os testes.
  const criarFuncionario = (): Funcionario => ({
    id: 0,
    nome: "Ana Tanaka",
    cargo: "Atendimento",
    email: "ana@sakuratrip.com.br",
    telefone: "(22) 99999-1000",
    ativo: true,
    cadastradoEm: "",
  });

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioService);
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve carregar os funcionários iniciais", () => {
    expect(service.funcionarios().length).toBe(2);
  });

  it("deve cadastrar um funcionário", () => {
    service.salvar(criarFuncionario());

    const funcionarios = service.funcionarios();

    expect(funcionarios.length).toBe(3);
    expect(funcionarios[2].nome).toBe("Ana Tanaka");
    expect(funcionarios[2].id).toBe(3);
    expect(funcionarios[2].cadastradoEm).not.toBe("");
  });

  it("deve editar um funcionário existente", () => {
    const funcionarioEditado = {
      ...service.funcionarios()[0],
      cargo: "Financeiro" as const,
    };

    service.salvar(funcionarioEditado);

    expect(service.funcionarios()[0].cargo).toBe("Financeiro");
  });

  it("deve alterar um funcionário de ativo para inativo", () => {
    service.alterarSituacao(1);

    expect(service.funcionarios()[0].ativo).toBe(false);
  });

  it("deve excluir um funcionário", () => {
    service.excluir(1);

    expect(service.funcionarios().length).toBe(1);
    expect(service.funcionarios().some((item) => item.id === 1)).toBe(false);
  });
});
