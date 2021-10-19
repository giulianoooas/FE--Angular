import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public getCarById(carId: number): Observable<{car:Car,categoryName:string} | undefined>{
    return this.http.get<{car:Car,categoryName:string} | undefined>(`${this.baseUrl}cars/${carId}`);
  }

  public getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.baseUrl}cars`);
  }

  public existsCar(carId: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}cars/${carId}/exists`);
  }

  public getCategoryName(carId: number): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}cars/${carId}/category-name`)
  }
}
