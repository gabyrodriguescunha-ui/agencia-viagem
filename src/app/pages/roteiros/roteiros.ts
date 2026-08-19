import { Component, inject } from "@angular/core";
import { Cabecalho } from "../../components/cabecalho/cabecalho";
import { CardRoteiro } from "../../components/card-roteiro/card-roteiro";
import { RoteiroService } from "../../services/roteiro.service";

@Component({
  selector: "app-roteiros",
  imports: [Cabecalho, CardRoteiro],
  templateUrl: "./roteiros.html",
  styleUrl: "./roteiros.css",
})
export class Roteiros {
  // Injeta a mesma fonte de dados utilizada pela administração.
  private readonly roteiroService = inject(RoteiroService);

  // Disponibiliza a lista reativa para o HTML.
  protected readonly roteiros = this.roteiroService.roteiros;
}