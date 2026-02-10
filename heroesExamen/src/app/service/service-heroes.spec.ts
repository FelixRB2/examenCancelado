import { TestBed } from '@angular/core/testing';

import { ServiceHeroes } from './service-heroes';

describe('ServiceHeroes', () => {
  let service: ServiceHeroes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHeroes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
