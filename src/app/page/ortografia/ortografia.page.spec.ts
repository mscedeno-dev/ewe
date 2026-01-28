import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrtografiaPage } from './ortografia.page';

describe('OrtografiaPage', () => {
  let component: OrtografiaPage;
  let fixture: ComponentFixture<OrtografiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrtografiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
