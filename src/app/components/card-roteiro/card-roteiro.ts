import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Roteiro } from "../../models/roteiro";

@Component({
  selector: "app-card-roteiro",
  imports: [RouterLink],
  templateUrl: "./card-roteiro.html",
  styleUrl: "./card-roteiro.css",
})
export class CardRoteiro {
  // Recebe um roteiro enviado pela página pública.
  readonly roteiro = input.required<Roteiro>();

  // Formata o preço no padrão brasileiro.
  protected formatarPreco(preco: number): string {
    return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}