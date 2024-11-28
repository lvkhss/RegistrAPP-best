import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesProfesorPage } from './clases-profesor.page';

describe('ClasesProfesorPage', () => {
  let component: ClasesProfesorPage;
  let fixture: ComponentFixture<ClasesProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
