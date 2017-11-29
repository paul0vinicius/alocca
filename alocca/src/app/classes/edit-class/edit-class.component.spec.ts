import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassComponent } from './edit-class.component';

describe('EditClassComponent', () => {
  let component: EditClassComponent;
  let fixture: ComponentFixture<EditClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});