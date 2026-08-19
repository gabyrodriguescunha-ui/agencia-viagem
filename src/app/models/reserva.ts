// Define os status permitidos para uma reserva.
export type StatusReserva = "Pendente" | "Confirmada" | "Cancelada";

// Define o formato dos dados de uma reserva.
export interface Reserva {
  id: number;
  criadaEm: string;

  roteiro: {
    id: number;
    nome: string;
    cidade: string;
    preco: number;
  };

  data: string;
  viajantes: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  formaPagamento: string;
  parcelas: number;
  valorTotal: number;
  status: StatusReserva;
}