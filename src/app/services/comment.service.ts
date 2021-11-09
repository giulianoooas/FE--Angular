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

  public getCommentsByBookId(bookId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}comments/${bookId}/book`);
  }

  public createComment(comment:Comment): Observable<Comment>{
    return this.http.post<Comment>(`${this.baseUrl}comments`,comment);
  }

  public deleteComment(commentId: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}comments/${commentId}/delete`);
  }

  public editComment(comment: Comment): Observable<Comment>{
    return this.http.put<Comment>(`${this.baseUrl}comments/${comment.commentId}/edit`,comment);
  }
}
