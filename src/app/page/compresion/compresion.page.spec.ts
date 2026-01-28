import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompresionPage } from './compresion.page';

describe('CompresionPage', () => {
  let component: CompresionPage;
  let fixture: ComponentFixture<CompresionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompresionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
