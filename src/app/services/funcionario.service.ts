import { Injectable, signal } from "@angular/core";
import { Funcionario } from "../models/funcionario";

// Nome utilizado para guardar os funcionários no navegador.
const CHAVE_FUNCIONARIOS = "sakura-trip-funcionarios";

// Funcionários iniciais exibidos quando ainda não existem dados salvos.
const FUNCIONARIOS_INICIAIS: Funcionario[] = [
  {
    id: 1,
    nome: "Marina Sato",
    cargo: "Administrador",
    email: "marina@sakuratrip.com.br",
    telefone: "(21) 99999-1001",
    ativo: true,
    cadastradoEm: "2026-08-18T12:00:00.000Z",
  },
  {
    id: 2,
    nome: "Kenji Oliveira",
    cargo: "Guia de turismo",
    email: "kenji@sakuratrip.com.br",
    telefone: "(21) 99999-1002",
    ativo: true,
    cadastradoEm: "2026-08-18T12:00:00.000Z",
  },
];

@Injectable({ providedIn: "root" })
export class FuncionarioService {
  // O signal atualiza a página quando a lista sofre uma alteração.
  private readonly estadoFuncionarios = signal<Funcionario[]>(this.carregar());

  // Disponibiliza a lista sem permitir alterações diretas fora do serviço.
  readonly funcionarios = this.estadoFuncionarios.asReadonly();

  // Cadastra um funcionário ou atualiza um cadastro existente.
  salvar(dados: Funcionario): void {
    const lista = this.estadoFuncionarios();
    const funcionarioExiste = lista.some((funcionario) => funcionario.id === dados.id);

    const listaAtualizada = funcionarioExiste
      ? lista.map((funcionario) => funcionario.id === dados.id ? dados : funcionario)
      : [
          ...lista,
          {
            ...dados,
            id: this.proximoId(),
            cadastradoEm: new Date().toISOString(),
          },
        ];

    this.atualizar(listaAtualizada);
  }

  // Alterna a situação do funcionário entre ativo e inativo.
  alterarSituacao(id: number): void {
    const listaAtualizada = this.estadoFuncionarios().map((funcionario) =>
      funcionario.id === id
        ? { ...funcionario, ativo: !funcionario.ativo }
        : funcionario,
    );

    this.atualizar(listaAtualizada);
  }

  // Remove um funcionário da lista.
  excluir(id: number): void {
    const listaAtualizada = this.estadoFuncionarios().filter(
      (funcionario) => funcionario.id !== id,
    );

    this.atualizar(listaAtualizada);
  }

  // Recupera os funcionários salvos no navegador.
  private carregar(): Funcionario[] {
    const conteudoSalvo = localStorage.getItem(CHAVE_FUNCIONARIOS);

    if (!conteudoSalvo) {
      return FUNCIONARIOS_INICIAIS;
    }

    try {
      const funcionariosConvertidos = JSON.parse(conteudoSalvo);
      return Array.isArray(funcionariosConvertidos)
        ? funcionariosConvertidos
        : FUNCIONARIOS_INICIAIS;
    } catch {
      return FUNCIONARIOS_INICIAIS;
    }
  }

  // Atualiza o signal e o localStorage.
  private atualizar(funcionarios: Funcionario[]): void {
    this.estadoFuncionarios.set(funcionarios);
    localStorage.setItem(CHAVE_FUNCIONARIOS, JSON.stringify(funcionarios));
  }

  // Calcula um identificador que ainda não foi utilizado.
  private proximoId(): number {
    const ids = this.estadoFuncionarios().map((funcionario) => funcionario.id);
    return Math.max(0, ...ids) + 1;
  }
}
