import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavTrainerListComponent } from './fav-trainer-list.component';

describe('FavTrainerListComponent', () => {
  let component: FavTrainerListComponent;
  let fixture: ComponentFixture<FavTrainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavTrainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavTrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
