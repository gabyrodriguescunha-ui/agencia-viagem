import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Cabecalho } from "../../components/cabecalho/cabecalho";
import { RoteiroService } from "../../services/roteiro.service";

@Component({
  selector: "app-detalhes-roteiro",
  imports: [Cabecalho, RouterLink],
  templateUrl: "./detalhes-roteiro.html",
  styleUrl: "./detalhes-roteiro.css",
})
export class DetalhesRoteiro {
  // Injeta os recursos sem utilizar constructor ou OnInit.
  private readonly rota = inject(ActivatedRoute);
  private readonly roteiroService = inject(RoteiroService);

  // Lê o id da URL e procura o roteiro correspondente.
  private readonly id = Number(this.rota.snapshot.paramMap.get("id"));
  protected readonly roteiro = this.roteiroService.buscarPorId(this.id);

  // Formata o preço no padrão brasileiro.
  protected formatarPreco(preco: number): string {
    return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}