import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewCarComponent } from './request-new-car.component';

describe('RequestNewCarComponent', () => {
  let component: RequestNewCarComponent;
  let fixture: ComponentFixture<RequestNewCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestNewCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNewCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
