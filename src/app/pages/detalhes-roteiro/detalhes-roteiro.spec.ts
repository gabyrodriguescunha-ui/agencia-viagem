import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from "@angular/router";
import { DetalhesRoteiro } from './detalhes-roteiro';

describe('DetalhesRoteiro', () => {
  let component: DetalhesRoteiro;
  let fixture: ComponentFixture<DetalhesRoteiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesRoteiro],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesRoteiro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
