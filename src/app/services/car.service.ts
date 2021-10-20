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

  public getCarById(carId: number): Observable<{car:Car,categoryName:string}>{
    return this.http.get<{car:Car,categoryName:string}>(`${this.baseUrl}cars/${carId}`);
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

  public deleteCar(carId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}cars/${carId}`)
  }

  public createCar(car:Car): Observable<Car>{
    return this.http.post<Car>(`${this.baseUrl}cars`,car);
  }

  public editCar(car:Car): Observable<Car>{
    return this.http.put<Car>(`${this.baseUrl}cars/${car.carId}/edit`,car);
  }
}
