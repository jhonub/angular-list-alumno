import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlumnoComponent } from './create-alumno.component';

describe('CreateAlumnoComponent', () => {
  let component: CreateAlumnoComponent;
  let fixture: ComponentFixture<CreateAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
