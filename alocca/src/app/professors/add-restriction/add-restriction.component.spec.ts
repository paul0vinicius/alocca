import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestrictionComponent } from './add-restriction.component';

describe('AddRestrictionComponent', () => {
  let component: AddRestrictionComponent;
  let fixture: ComponentFixture<AddRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
