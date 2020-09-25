import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUndanganComponent } from './register-undangan.component';

describe('RegisterUndanganComponent', () => {
  let component: RegisterUndanganComponent;
  let fixture: ComponentFixture<RegisterUndanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUndanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUndanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
