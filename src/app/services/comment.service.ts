import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public getCommentsByCarId(carId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}cars/${carId}/comments`);
  }
}
