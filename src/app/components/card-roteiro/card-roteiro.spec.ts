import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoteiro } from './card-roteiro';

describe('CardRoteiro', () => {
  let component: CardRoteiro;
  let fixture: ComponentFixture<CardRoteiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRoteiro],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRoteiro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
