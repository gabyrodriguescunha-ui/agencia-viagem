import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Cabecalho } from "../../components/cabecalho/cabecalho";
import { Petalas } from "../../components/petalas/petalas";

@Component({
  selector: "app-inicio",

  // Adiciona o componente Petalas à página inicial.
  imports: [Cabecalho, Petalas, RouterLink],

  templateUrl: "./inicio.html",
  styleUrl: "./inicio.css",
})
export class Inicio {}