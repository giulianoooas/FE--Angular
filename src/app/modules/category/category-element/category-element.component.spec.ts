import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarModule } from '../../car/car.module';

import { CategoryElementComponent } from './category-element.component';

describe('CategoryElementComponent', () => {
  let component: CategoryElementComponent;
  let fixture: ComponentFixture<CategoryElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, MatIconModule, MatButtonModule, CarModule],
      declarations: [ CategoryElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
