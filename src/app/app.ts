import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rodape } from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('agencia-viagem');
}