import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}categories`);
  }

  public getAllCarOfCategory(categoryId: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.baseUrl}/categories/${categoryId}/cars`);
  }
}
