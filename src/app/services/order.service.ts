import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  public increaseOrder(data: {userId: number, bookId: number}): Observable<void>{
    return this.http.patch<void>(`${this.baseUrl}orders/increase`,data);
  }

  public decreaseOrder(data: {userId: number, bookId: number}): Observable<void>{
    return this.http.patch<void>(`${this.baseUrl}orders/decrease`,data);
  }
}
