// Importa o recurso utilizado para criar um componente Angular.
import { Component } from "@angular/core";

@Component({
  selector: "app-petalas",
  imports: [],
  templateUrl: "./petalas.html",
  styleUrl: "./petalas.css",
})
export class Petalas {
  // Cria uma lista com 18 posições para gerar as pétalas no HTML.
  protected readonly petalas = Array.from({ length: 18 });
}