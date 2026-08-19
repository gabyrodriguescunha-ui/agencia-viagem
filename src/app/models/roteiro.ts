// Representa uma etapa do itinerário.
export interface ItemItinerario {
  dia: string;
  titulo: string;
  descricao: string;
}

// Representa uma pergunta frequente.
export interface PerguntaRoteiro {
  pergunta: string;
  resposta: string;
}

// Modelo único usado no site público e no painel administrativo.
export interface Roteiro {
  id: number;
  nome: string;
  descricao: string;
  cidade: string;
  duracao: string;
  preco: number;
  vagas: number;
  imagem: string;
  categoria: string;
  datas: string[];
  incluidos: string[];
  itinerario: ItemItinerario[];
  perguntas: PerguntaRoteiro[];
}
