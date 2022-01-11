import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  private readonly baseUrl = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public predictScore(): Observable<number>{
    return this.http.post<number>(`${this.baseUrl}price-predict`, {});
  }
}
