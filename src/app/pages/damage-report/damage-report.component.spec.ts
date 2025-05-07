import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageReportComponent } from './damage-report.component';

describe('DamageReportComponent', () => {
  let component: DamageReportComponent;
  let fixture: ComponentFixture<DamageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamageReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
