import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyEnvasesComponent } from './empty-envases.component';

describe('EmptyEnvasesComponent', () => {
  let component: EmptyEnvasesComponent;
  let fixture: ComponentFixture<EmptyEnvasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyEnvasesComponent]
    });
    fixture = TestBed.createComponent(EmptyEnvasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
