import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyExpoComponent } from './poly-expo.component';

describe('PolyExpoComponent', () => {
  let component: PolyExpoComponent;
  let fixture: ComponentFixture<PolyExpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolyExpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolyExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
