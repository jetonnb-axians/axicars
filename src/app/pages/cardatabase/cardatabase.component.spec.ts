import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardatabaseComponent } from './cardatabase.component';

describe('CardatabaseComponent', () => {
  let component: CardatabaseComponent;
  let fixture: ComponentFixture<CardatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
