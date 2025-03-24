import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversdatabaseComponent } from './driversdatabase.component';

describe('DriversdatabaseComponent', () => {
  let component: DriversdatabaseComponent;
  let fixture: ComponentFixture<DriversdatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversdatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
