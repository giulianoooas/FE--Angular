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

  public getAllCarOfCategory(categoryId: number): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.baseUrl}categories/${categoryId}/cars`);
  }

  public deleteCategory(categoryId: number): Observable<Category[]>{
    return this.http.delete<Category[]>(`${this.baseUrl}categories/${categoryId}/delete`);
  }

  public editCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}categories/${category.categoryId}/edit`,category);
  }
}
