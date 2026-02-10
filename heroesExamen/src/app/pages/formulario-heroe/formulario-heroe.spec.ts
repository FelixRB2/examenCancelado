import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHeroe } from './formulario-heroe';

describe('FormularioHeroe', () => {
  let component: FormularioHeroe;
  let fixture: ComponentFixture<FormularioHeroe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioHeroe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioHeroe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
