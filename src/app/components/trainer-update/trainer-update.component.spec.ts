import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerUpdateComponent } from './trainer-update.component';

describe('TrainerUpdateComponent', () => {
  let component: TrainerUpdateComponent;
  let fixture: ComponentFixture<TrainerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
