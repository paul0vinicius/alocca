import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfessorsComponent } from './view-professors.component';

describe('ViewProfessorsComponent', () => {
  let component: ViewProfessorsComponent;
  let fixture: ComponentFixture<ViewProfessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfessorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
