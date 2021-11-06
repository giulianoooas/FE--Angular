import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userIdToken = 'TOKEN_FOR_CONNECTION_ID';
  readonly adminToken = 'TOKEN_FOR_CONNECTION_ADMIN';

  public constructor(private sessionStorage: SessionStorageService) { }

  public getUserId(): number{
    if (!this.sessionStorage.getItem(this.userIdToken))
     return -1;
    return Number(this.sessionStorage.getItem(this.userIdToken));
  }

  public getIsAdmin(): boolean{
    if (!this.sessionStorage.getItem(this.adminToken))
     return false;
    return Boolean(this.sessionStorage.getItem(this.adminToken));
  }

  public setUser(user: User): void{
    this.sessionStorage.setItem(this.userIdToken,String(user.userId));
    this.sessionStorage.setItem(this.adminToken, String(user.isAdmin));
  }
}
