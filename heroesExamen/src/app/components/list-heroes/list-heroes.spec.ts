import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeroes } from './list-heroes';

describe('ListHeroes', () => {
  let component: ListHeroes;
  let fixture: ComponentFixture<ListHeroes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHeroes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHeroes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
