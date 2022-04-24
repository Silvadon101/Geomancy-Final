import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineExpoComponent } from './line-expo.component';

describe('LineExpoComponent', () => {
  let component: LineExpoComponent;
  let fixture: ComponentFixture<LineExpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineExpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
