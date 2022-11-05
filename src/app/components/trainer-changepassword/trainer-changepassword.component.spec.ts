import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerChangepasswordComponent } from './trainer-changepassword.component';

describe('TrainerChangepasswordComponent', () => {
  let component: TrainerChangepasswordComponent;
  let fixture: ComponentFixture<TrainerChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerChangepasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
