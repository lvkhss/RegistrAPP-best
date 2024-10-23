import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalEstudiantesPage } from './principal-estudiantes.page';

describe('PrincipalEstudiantesPage', () => {
  let component: PrincipalEstudiantesPage;
  let fixture: ComponentFixture<PrincipalEstudiantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalEstudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
