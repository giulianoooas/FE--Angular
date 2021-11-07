import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userIdToken = 'TOKEN_FOR_CONNECTION_ID';
  readonly adminToken = 'TOKEN_FOR_CONNECTION_ADMIN';
  readonly emailToken = 'TOKEN_FOR_CONNECTION_EMAIL';

  public constructor(private sessionStorage: SessionStorageService) { }

  public getUserId(): number{
    if (!this.sessionStorage.getItem(this.userIdToken))
     return -1;
    return Number(this.sessionStorage.getItem(this.userIdToken));
  }

  public getEmail(): string{
    return this.sessionStorage.getItem(this.emailToken) ?? '';
  }

  public getIsAdmin(): boolean{
    if (!this.sessionStorage.getItem(this.adminToken) || this.sessionStorage.getItem(this.adminToken) === 'false')
     return false;
    return true;
  }

  public setUser(user: User): void{
    this.sessionStorage.setItem(this.userIdToken,String(user.userId));
    this.sessionStorage.setItem(this.adminToken, String(user.isAdmin));
    this.sessionStorage.setItem(this.emailToken, user.email);
  }

  public logOut(): void{
    this.sessionStorage.removeItem(this.userIdToken);
    this.sessionStorage.removeItem(this.adminToken);
    this.sessionStorage.removeItem(this.emailToken);
  }
}
