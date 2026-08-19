import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cabecalho } from '../../components/cabecalho/cabecalho';


@Component({
  selector: 'app-sobre',
  imports: [Cabecalho, RouterLink],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {}
