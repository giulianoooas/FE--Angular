import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookService } from '../services/book.service';

@Injectable({
  providedIn: 'root'
})
export class BookGuard implements CanActivate {
  public constructor(private bookService: BookService, private location: Location){}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    const bookId = Number(route.paramMap.get('bookId'));
    return this.existsBook(bookId);
  }

  private  existsBook(bookId: number): Observable<boolean>{
    return  this.bookService.existsBook(bookId).pipe(tap((data) => {
      if (data == false)
        this.location.back();
    }));
  }

}

