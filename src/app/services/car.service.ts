import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public getCarById(carId: number): Observable<Car>{
    return this.http.get<Car>(`${this.baseUrl}cars/${carId}`);
  }

  public getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.baseUrl}cars`);
  }
}
