import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEnvaseModalComponent } from './cantidad-envase-modal.component';

describe('CantidadEnvaseModalComponent', () => {
  let component: CantidadEnvaseModalComponent;
  let fixture: ComponentFixture<CantidadEnvaseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CantidadEnvaseModalComponent]
    });
    fixture = TestBed.createComponent(CantidadEnvaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
