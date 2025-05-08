import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmReportModalComponent } from './km-report-modal.component';

describe('KmReportModalComponent', () => {
  let component: KmReportModalComponent;
  let fixture: ComponentFixture<KmReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KmReportModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KmReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
