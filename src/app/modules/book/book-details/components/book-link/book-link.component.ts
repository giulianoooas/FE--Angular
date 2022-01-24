import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-link',
  templateUrl: './book-link.component.html',
  styleUrls: ['./book-link.component.scss']
})
export class BookLinkComponent{
  @Input() book: Book;
  @Input() bookId: number;

  public constructor(
    private router: Router
  ) { }

  public redirectToBook(): void{
    this.router.navigateByUrl(`books/${this.bookId}`);
  }
}
