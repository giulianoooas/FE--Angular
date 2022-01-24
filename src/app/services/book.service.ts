import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:3000/';

  public constructor(private http: HttpClient) { }

  public getBookById(bookId: number): Observable<{book:Book,categoryName:string}>{
    return this.http.get<{book:Book,categoryName:string}>(`${this.baseUrl}books/${bookId}`);
  }

  public getSeeAlsoBooks(bookId: number): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}books/${bookId}/see-also`);
  }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}books`);
  }

  public existsBook(bookId: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}books/${bookId}/exists`);
  }

  public getCategoryName(bookId: number): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}books/${bookId}/category-name`)
  }

  public deleteBook(bookId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}books/${bookId}`)
  }

  public createBook(book:Book): Observable<Book>{
    return this.http.post<Book>(`${this.baseUrl}books`,book);
  }

  public editBook(book:Book): Observable<Book>{
    return this.http.put<Book>(`${this.baseUrl}books/${book.bookId}/edit`,book);
  }
}
