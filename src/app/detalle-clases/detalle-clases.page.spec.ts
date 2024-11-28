import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleClasesPage } from './detalle-clases.page';

describe('DetalleClasesPage', () => {
  let component: DetalleClasesPage;
  let fixture: ComponentFixture<DetalleClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
