import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userIdToken = 'TOKEN_FOR_CONNECTION';

  public constructor(private sessionStorage: SessionStorageService) { }

  public getUserId(): number{
    if (!this.sessionStorage.getItem(this.userIdToken))
     return -1;
    return Number(this.sessionStorage.getItem(this.userIdToken));
  }

  public setUserId(userId: number): void{
    this.sessionStorage.setItem(this.userIdToken,String(userId));
  }
}
