import { Injectable } from '@angular/core';
import { User, UserStatus } from '../models/user.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userIdToken = 'TOKEN_FOR_CONNECTION_ID';
  readonly statusToken = 'TOKEN_FOR_CONNECTION_STATUS';
  readonly emailToken = 'TOKEN_FOR_CONNECTION_EMAIL';
  readonly nicknameToke = 'TOKEN_FOR_CONNECTION_NICKNAME';
  readonly logoUrlToken = 'TOKEN_FOR_CONNECTION_LOGO';

  public constructor(private sessionStorage: SessionStorageService) { }

  public getUserId(): number{
    if (!this.sessionStorage.getItem(this.userIdToken))
     return -1;
    return Number(this.sessionStorage.getItem(this.userIdToken));
  }

  public getUserStatus(): string{
    return this.sessionStorage.getItem(this.statusToken) ?? '';
  }

  public getEmail(): string{
    return this.sessionStorage.getItem(this.emailToken) ?? '';
  }

  public getNickname(): string{
    return this.sessionStorage.getItem(this.nicknameToke) ?? '';
  }

  public getLogoUrl(): string | undefined{
    return this.sessionStorage.getItem(this.logoUrlToken) ?? undefined;
  }

  public getIsAdmin(): boolean{
    if (!this.sessionStorage.getItem(this.statusToken) || this.sessionStorage.getItem(this.statusToken) !== UserStatus.ADMIN)
     return false;
    return true;
  }

  public getIsCustomer(): boolean{
    if (!this.sessionStorage.getItem(this.statusToken) || this.sessionStorage.getItem(this.statusToken) !== UserStatus.CUSTOMER)
     return false;
    return true;
  }

  public getIsLibrary(): boolean{
    if (!this.sessionStorage.getItem(this.statusToken) || this.sessionStorage.getItem(this.statusToken) !== UserStatus.LIBRARY)
     return false;
    return true;
  }

  public setUser(user: User): void{
    this.sessionStorage.setItem(this.userIdToken,String(user.userId));
    this.sessionStorage.setItem(this.statusToken, user.userStatus);
    this.sessionStorage.setItem(this.emailToken, user.email);
    this.sessionStorage.setItem(this.nicknameToke, user.nickname);
    if (user.logoUrl){
      this.sessionStorage.setItem(this.logoUrlToken, user.logoUrl);
    }
  }

  public logOut(): void{
    this.sessionStorage.removeItem(this.userIdToken);
    this.sessionStorage.removeItem(this.statusToken);
    this.sessionStorage.removeItem(this.emailToken);
    this.sessionStorage.removeItem(this.nicknameToke);
    this.sessionStorage.removeItem(this.logoUrlToken);
  }
}
