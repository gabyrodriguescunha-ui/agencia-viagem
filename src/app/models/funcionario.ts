// Define os cargos disponíveis para os funcionários da agência.
export type CargoFuncionario =
  | "Administrador"
  | "Atendimento"
  | "Financeiro"
  | "Guia de turismo";

// Define a estrutura utilizada para armazenar um funcionário.
export interface Funcionario {
  id: number;
  nome: string;
  cargo: CargoFuncionario;
  email: string;
  telefone: string;
  ativo: boolean;
  cadastradoEm: string;
}
