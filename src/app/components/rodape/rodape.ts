import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-rodape',
  imports: [RouterLink],
  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
})
export class Rodape {
  // Obtém o ano atual automaticamente.
  protected readonly anoAtual = new Date().getFullYear();
}