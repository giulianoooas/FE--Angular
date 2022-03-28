import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TextValidatorAPI{
  private readonly endpoint = 'http://127.0.0.1:5000/comment-status';

  public constructor(
    private readonly http: HttpClient
  ){}

  public getTextStatus(text: string): Observable<string>{ // 0-> bad, 1 -> good
    return this.http.get<string>(this.endpoint, {
      params: new HttpParams().append('comment', text)
    })
  }
}
