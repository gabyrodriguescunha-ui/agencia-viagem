import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from "@angular/router";
import { Petalas } from './petalas';

describe('Petalas', () => {
  let component: Petalas;
  let fixture: ComponentFixture<Petalas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Petalas],
       providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Petalas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
