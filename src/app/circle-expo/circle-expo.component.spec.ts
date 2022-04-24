import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleExpoComponent } from './circle-expo.component';

describe('CircleExpoComponent', () => {
  let component: CircleExpoComponent;
  let fixture: ComponentFixture<CircleExpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleExpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
