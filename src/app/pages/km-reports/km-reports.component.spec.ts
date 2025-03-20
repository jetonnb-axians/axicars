import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmReportsComponent } from './km-reports.component';

describe('KmReportsComponent', () => {
  let component: KmReportsComponent;
  let fixture: ComponentFixture<KmReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KmReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KmReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
