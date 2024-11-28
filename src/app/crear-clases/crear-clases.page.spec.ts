import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearClasesPage } from './crear-clases.page';

describe('CrearClasesPage', () => {
  let component: CrearClasesPage;
  let fixture: ComponentFixture<CrearClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
