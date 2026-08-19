import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Reserva } from "../../../models/reserva";
import { FuncionarioService } from "../../../services/funcionario.service";
import { ReservaService } from "../../../services/reserva.service";
import { RoteiroService } from "../../../services/roteiro.service";
import { MenuAdmin } from "../menu-admin/menu-admin";

@Component({
  selector: "app-dashboard",
  imports: [MenuAdmin, RouterLink],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard {
  // Injeta os serviços que fornecem os dados apresentados no painel.
  private readonly reservaService = inject(ReservaService);
  private readonly roteiroService = inject(RoteiroService);
  private readonly funcionarioService = inject(FuncionarioService);
  // Recupera as reservas armazenadas no navegador.
  protected readonly reservas = this.reservaService.listar();
  // Utiliza os signals dos serviços de roteiros e funcionários.
  protected readonly roteiros = this.roteiroService.roteiros;
  protected readonly funcionarios = this.funcionarioService.funcionarios;
  // Conta as reservas que ainda aguardam análise.
  protected get reservasPendentes(): number {
    return this.reservas.filter((reserva) => reserva.status === "Pendente").length;
  }
  // Conta as reservas que já foram confirmadas.
  protected get reservasConfirmadas(): number {
    return this.reservas.filter((reserva) => reserva.status === "Confirmada").length;
  }
  // Soma somente os valores das reservas confirmadas.
  protected get faturamentoConfirmado(): number {
    return this.reservas
      .filter((reserva) => reserva.status === "Confirmada")
      .reduce((total, reserva) => total + reserva.valorTotal, 0);
  }
  // Conta somente os funcionários que estão ativos.
  protected get funcionariosAtivos(): number {
    return this.funcionarios().filter((funcionario) => funcionario.ativo).length;
  }
  // Retorna as cinco reservas mais recentes para o resumo do painel.
  protected get reservasRecentes(): Reserva[] {
    return [...this.reservas]
      .sort(
        (primeira, segunda) =>
          new Date(segunda.criadaEm).getTime() -
          new Date(primeira.criadaEm).getTime(),
      )
      .slice(0, 5);
  }
  // Formata um valor no padrão monetário brasileiro.
  protected formatarPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  // Converte a data de criação para o formato brasileiro.
  protected formatarData(data: string): string {
    return new Date(data).toLocaleDateString("pt-BR");
  }
}