import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ForumComment, ForumCommentEdit } from '../models/forum-comment.model';
import { ForumText, ForumTextEdit } from '../models/forum-text.model';

//TODO: Sa adaug un model care verifica comentariile urate

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl = 'http://localhost:3000/forum';

  private data = new Subject<string>();

  public getData(): Observable<string>{
    return this.data.asObservable();
  }

  public sendData(data: {
    name: string,
    date: string,
    text: string,
    userId: number,
    commentId?: number,
    index?: number
  }): void{
    this.data.next(JSON.stringify(data));
  }

  public constructor(private http: HttpClient) { }

  public getAllForumTexts(): Observable<ForumText[]>{
    return this.http.get<ForumText[]>(this.baseUrl);
  }

  public getAllForumTextComments(forumTextId: number): Observable<ForumComment[]>{
    return this.http.get<ForumComment[]>(this.baseUrl + `/${forumTextId}`);
  }

  public createForumText(forumText: ForumTextEdit): Observable<ForumText>{
    return this.http.post<ForumText>(this.baseUrl + '/forumText', forumText);
  }

  public editForumText(forumText: ForumTextEdit): Observable<ForumText>{
    return this.http.put<ForumText>(this.baseUrl + `/forumText/${forumText.forumTextId}`, forumText);
  }

  public createForumComment(forumComment: ForumCommentEdit): Observable<ForumComment>{
    return this.http.post<ForumComment>(this.baseUrl + '/forumComment', forumComment);
  }

  public editForumComment(forumComment: ForumCommentEdit): Observable<ForumComment>{
    return this.http.put<ForumComment>(this.baseUrl + `/forumComment/${forumComment.forumCommentId}`, forumComment);
  }

  public deleteForumText(forumTextId: number): Observable<void>{
    return this.http.delete<void>(this.baseUrl + `/forumText/${forumTextId}`);
  }

  public deleteForumComment(forumCommentId: number): Observable<void>{
    return this.http.delete<void>(this.baseUrl + `/forumComment/${forumCommentId}`);
  }
}
