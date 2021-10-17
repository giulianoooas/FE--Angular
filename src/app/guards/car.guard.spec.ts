import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CarGuard } from './car.guard';

describe('CarGuard', () => {
  let guard: CarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule]
    });
    guard = TestBed.inject(CarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
