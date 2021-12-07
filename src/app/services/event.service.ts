import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private data = new Subject<string>();

  public getData(): Observable<string>{
    return this.data.asObservable();
  }

  public sendData(data: string): void{
    this.data.next(data);
  }
}
