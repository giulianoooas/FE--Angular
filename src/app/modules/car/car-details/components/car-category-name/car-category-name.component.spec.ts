import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCategoryNameComponent } from './car-category-name.component';

describe('CarCategoryNameComponent', () => {
  let component: CarCategoryNameComponent;
  let fixture: ComponentFixture<CarCategoryNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCategoryNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCategoryNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
