import { Component, inject } from "@angular/core";
import { Reserva } from "../../../models/reserva";
import { ReservaService } from "../../../services/reserva.service";
import { MenuAdmin } from "../menu-admin/menu-admin";

@Component({
  selector: "app-financeiro",
  imports: [MenuAdmin],
  templateUrl: "./financeiro.html",
  styleUrl: "./financeiro.css",
})
export class Financeiro {
  // Injeta o serviço que também é utilizado na página de reservas.
  private readonly reservaService = inject(ReservaService);

  // Carrega as reservas armazenadas no navegador.
  protected readonly reservas = this.reservaService.listar();

  // Soma somente as reservas confirmadas.
  protected get totalRecebido(): number {
    return this.somarPorStatus("Confirmada");
  }

  // Soma os valores que ainda aguardam confirmação.
  protected get totalPendente(): number {
    return this.somarPorStatus("Pendente");
  }

  // Soma os valores das reservas canceladas.
  protected get totalCancelado(): number {
    return this.somarPorStatus("Cancelada");
  }

  // Retorna apenas as reservas que representam receita confirmada.
  protected get reservasConfirmadas(): Reserva[] {
    return this.reservas.filter((reserva) => reserva.status === "Confirmada");
  }

  // Calcula o valor médio das reservas confirmadas.
  protected get ticketMedio(): number {
    if (this.reservasConfirmadas.length === 0) {
      return 0;
    }

    return this.totalRecebido / this.reservasConfirmadas.length;
  }

  // Soma os valores de todas as reservas que possuem o status informado.
  private somarPorStatus(status: Reserva["status"]): number {
    return this.reservas
      .filter((reserva) => reserva.status === status)
      .reduce((total, reserva) => total + reserva.valorTotal, 0);
  }

  // Formata os valores no padrão monetário brasileiro.
  protected formatarPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Converte a data em um formato mais amigável.
  protected formatarData(data: string): string {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  // Converte o valor salvo em um nome de pagamento mais amigável.
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