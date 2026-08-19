import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from "@angular/router";
import { Funcionarios } from './funcionarios';

describe('Funcionarios', () => {
  let component: Funcionarios;
  let fixture: ComponentFixture<Funcionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Funcionarios],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Funcionarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
