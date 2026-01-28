import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedaccionPage } from './redaccion.page';

describe('RedaccionPage', () => {
  let component: RedaccionPage;
  let fixture: ComponentFixture<RedaccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
