import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddImageComponent } from './user-add-image.component';

describe('UserAddImageComponent', () => {
  let component: UserAddImageComponent;
  let fixture: ComponentFixture<UserAddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
