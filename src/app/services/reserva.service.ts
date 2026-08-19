import { Injectable } from "@angular/core";
import { Reserva, StatusReserva } from "../models/reserva";

@Injectable({
  providedIn: "root",
})
export class ReservaService {
  // Nome da chave utilizada para salvar as reservas no navegador.
  private readonly chaveLocalStorage = "sakura-trip-reservas";

  // Recupera todas as reservas armazenadas no navegador.
  listar(): Reserva[] {
    const conteudoSalvo = localStorage.getItem(
      this.chaveLocalStorage,
    );

    // Retorna uma lista vazia quando ainda não existem reservas.
    if (!conteudoSalvo) {
      return [];
    }

    try {
      const reservasConvertidas = JSON.parse(conteudoSalvo);

      // Confirma que o conteúdo salvo realmente é uma lista.
      if (!Array.isArray(reservasConvertidas)) {
        return [];
      }

      // Adiciona o status Pendente às reservas criadas anteriormente.
      return reservasConvertidas.map((reserva: Reserva) => ({
        ...reserva,
        status: reserva.status ?? "Pendente",
      }));
    } catch {
      // Retorna uma lista vazia caso o conteúdo esteja inválido.
      return [];
    }
  }

  // Adiciona uma nova reserva e retorna a lista atualizada.
  salvar(novaReserva: Reserva): Reserva[] {
    const reservas = this.listar();

    reservas.push(novaReserva);
    this.armazenar(reservas);

    return reservas;
  }

  // Altera o status de uma reserva e retorna a lista atualizada.
  alterarStatus(id: number, novoStatus: StatusReserva): Reserva[] {
    const reservasAtualizadas = this.listar().map((reserva) => {
      if (reserva.id === id) {
        return {
          ...reserva,
          status: novoStatus,
        };
      }

      return reserva;
    });

    this.armazenar(reservasAtualizadas);
    return reservasAtualizadas;
  }

  // Exclui uma reserva e retorna a lista atualizada.
  excluir(id: number): Reserva[] {
    const reservasAtualizadas = this.listar().filter(
      (reserva) => reserva.id !== id,
    );

    this.armazenar(reservasAtualizadas);
    return reservasAtualizadas;
  }

  // Converte a lista em texto e salva no localStorage.
  private armazenar(reservas: Reserva[]): void {
    localStorage.setItem(
      this.chaveLocalStorage,
      JSON.stringify(reservas),
    );
  }
}