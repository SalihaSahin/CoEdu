import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAddImageComponent } from './trainer-add-image.component';

describe('TrainerAddImageComponent', () => {
  let component: TrainerAddImageComponent;
  let fixture: ComponentFixture<TrainerAddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerAddImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
