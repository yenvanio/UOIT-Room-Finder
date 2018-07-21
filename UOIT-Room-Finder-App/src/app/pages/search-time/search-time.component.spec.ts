import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTimeComponent } from './search-time.component';

describe('SearchTimeComponent', () => {
  let component: SearchTimeComponent;
  let fixture: ComponentFixture<SearchTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
