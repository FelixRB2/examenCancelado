import { TestBed } from '@angular/core/testing';

import { ServiceUsuario } from './service-usuario';

describe('ServiceUsuario', () => {
  let service: ServiceUsuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUsuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
