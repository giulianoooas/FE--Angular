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

  public createComment(comment:Comment): Observable<{id:number}>{
    return this.http.post<{id:number}>(`${this.baseUrl}comments`,comment);
  }

  public deleteComment(commentId: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}comments/${commentId}`);
  }
}
