import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsBoardComponent } from './alerts-board.component';

describe('AlertsBoardComponent', () => {
  let component: AlertsBoardComponent;
  let fixture: ComponentFixture<AlertsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
