import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';

  public constructor(private http: HttpClient) { }

  public predictScore(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}predict-score`);
  }
}
