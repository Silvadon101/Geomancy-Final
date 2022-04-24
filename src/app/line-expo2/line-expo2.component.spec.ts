import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineExpo2Component } from './line-expo2.component';

describe('LineExpo2Component', () => {
  let component: LineExpo2Component;
  let fixture: ComponentFixture<LineExpo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineExpo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineExpo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
