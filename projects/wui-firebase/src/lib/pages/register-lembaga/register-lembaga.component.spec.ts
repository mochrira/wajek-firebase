import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLembagaComponent } from './register-lembaga.component';

describe('RegisterLembagaComponent', () => {
  let component: RegisterLembagaComponent;
  let fixture: ComponentFixture<RegisterLembagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLembagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLembagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
