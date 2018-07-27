import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureClassComponent } from './future-class.component';

describe('FutureClassComponent', () => {
  let component: FutureClassComponent;
  let fixture: ComponentFixture<FutureClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
