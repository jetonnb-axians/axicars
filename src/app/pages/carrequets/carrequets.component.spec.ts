import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrequetsComponent } from './carrequets.component';

describe('CarrequetsComponent', () => {
  let component: CarrequetsComponent;
  let fixture: ComponentFixture<CarrequetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrequetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrequetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
