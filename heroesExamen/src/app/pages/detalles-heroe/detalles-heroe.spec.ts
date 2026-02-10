import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesHeroe } from './detalles-heroe';

describe('DetallesHeroe', () => {
  let component: DetallesHeroe;
  let fixture: ComponentFixture<DetallesHeroe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesHeroe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesHeroe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
