import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompresionSubmoduloPage } from './submodulo.page';

describe('SubmoduloPage', () => {
  let component: CompresionSubmoduloPage;
  let fixture: ComponentFixture<CompresionSubmoduloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompresionSubmoduloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
