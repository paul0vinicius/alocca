import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesContainerComponent } from './classes-container.component';

describe('ClassesContainerComponent', () => {
  let component: ClassesContainerComponent;
  let fixture: ComponentFixture<ClassesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
