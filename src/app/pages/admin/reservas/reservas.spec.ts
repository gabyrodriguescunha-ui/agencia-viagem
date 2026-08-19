import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from "@angular/router";
import { Reservas } from './reservas';

describe('Reservas', () => {
  let component: Reservas;
  let fixture: ComponentFixture<Reservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
