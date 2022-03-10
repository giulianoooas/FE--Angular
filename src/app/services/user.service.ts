import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  public createUser(user: {
  password: string;
  email: string;
  nickname: string
  }): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}users`, user);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}users/${user.userId}`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}users/${userId}/delete`);
  }

  public login(user: {
    email: string,
    password: string
  }): Observable<User | null>{
    return this.http.post<User | null>(`${this.baseUrl}users/login`,user);
  }

  public getUserInfo(userId: number): Observable<{
    name: string;
    imageSrc: string;
  }| null>{
    return this.http.get<{
      name: string;
      imageSrc: string;
    } | null>(`${this.baseUrl}users/${userId}/info`);
  }

  public getUsersInfo(userIds: number[]): Observable<{
    name: string;
    imageSrc: string;
  } []>{
    const params = new HttpParams().set('userIds', '' + userIds);
    return this.http.get<{
      name: string;
      imageSrc: string;
    } []>(`${this.baseUrl}users/all/info`);
  }
}
