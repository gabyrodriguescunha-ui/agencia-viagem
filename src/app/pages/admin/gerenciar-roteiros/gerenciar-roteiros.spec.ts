import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarRoteiros } from './gerenciar-roteiros';

describe('GerenciarRoteiros', () => {
  let component: GerenciarRoteiros;
  let fixture: ComponentFixture<GerenciarRoteiros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarRoteiros],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarRoteiros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
