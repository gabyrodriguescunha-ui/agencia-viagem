import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Reserva, StatusReserva } from "../../../models/reserva";
import { ReservaService } from "../../../services/reserva.service";
import { MenuAdmin } from "../menu-admin/menu-admin";

@Component({
  selector: "app-reservas",
  imports: [RouterLink, MenuAdmin],
  templateUrl: "./reservas.html",
  styleUrl: "./reservas.css",
})
export class Reservas {
  // Injeta o serviço responsável por gerenciar as reservas.
  private readonly reservaService = inject(ReservaService);

  // Carrega as reservas por meio do serviço durante a criação do componente.
  protected reservas: Reserva[] = this.reservaService.listar();

  // Altera o status da reserva selecionada.
  protected alterarStatus(id: number, evento: Event): void {
    const select = evento.target as HTMLSelectElement;
    const novoStatus = select.value as StatusReserva;

    // Atualiza o localStorage e a lista apresentada na tela.
    this.reservas = this.reservaService.alterarStatus(
      id,
      novoStatus,
    );
  }

  // Exclui definitivamente uma reserva da lista.
  protected excluirReserva(id: number): void {
    const confirmouExclusao = window.confirm(
      "Deseja realmente excluir esta reserva?",
    );

    // Interrompe o método caso o administrador cancele.
    if (!confirmouExclusao) {
      return;
    }

    // Exclui no serviço e atualiza a lista apresentada na tela.
    this.reservas = this.reservaService.excluir(id);
  }

  // Converte um valor para o formato da moeda brasileira.
  protected formatarPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Converte a data de criação para o formato brasileiro.
  protected formatarDataCriacao(data: string): string {
    return new Date(data).toLocaleString("pt-BR");
  }

  // Retorna um nome mais amigável para a forma de pagamento.
  protected formatarPagamento(reserva: Reserva): string {
    if (reserva.formaPagamento === "pix") {
      return "Pix";
    }

    if (reserva.formaPagamento === "cartao") {
      return `Cartão em ${reserva.parcelas}x`;
    }

    if (reserva.formaPagamento === "boleto") {
      return "Boleto";
    }

    return reserva.formaPagamento;
  }
}