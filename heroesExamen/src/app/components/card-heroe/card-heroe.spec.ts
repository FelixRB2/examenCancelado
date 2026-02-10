import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeroe } from './card-heroe';

describe('CardHeroe', () => {
  let component: CardHeroe;
  let fixture: ComponentFixture<CardHeroe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHeroe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHeroe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
