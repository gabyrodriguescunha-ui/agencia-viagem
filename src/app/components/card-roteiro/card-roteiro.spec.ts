import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { CardRoteiro } from "./card-roteiro";

describe("CardRoteiro", () => {
  let component: CardRoteiro;
  let fixture: ComponentFixture<CardRoteiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRoteiro],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRoteiro);
    component = fixture.componentInstance;

    // Fornece o input obrigatório antes de renderizar o componente.
    fixture.componentRef.setInput("roteiro", {
      id: 1,
      nome: "Tóquio Otaku",
      descricao: "Roteiro de teste",
      cidade: "Tóquio",
      duracao: "7 dias e 6 noites",
      preco: 14890,
      vagas: 12,
      imagem: "images/toquio-otaku.png",
      categoria: "Cultura otaku",
      datas: [],
      incluidos: [],
      itinerario: [],
      perguntas: [],
    });

    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });
});