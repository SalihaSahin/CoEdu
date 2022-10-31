import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavSummaryComponent } from './fav-summary.component';

describe('FavSummaryComponent', () => {
  let component: FavSummaryComponent;
  let fixture: ComponentFixture<FavSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
