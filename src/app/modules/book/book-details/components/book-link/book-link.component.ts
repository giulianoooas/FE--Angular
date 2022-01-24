import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() changeBookEvent = new EventEmitter<void>();

  public constructor(
    private router: Router
  ) { }

  public redirectToBook(): void{
    this.router.navigateByUrl(`books/${this.bookId}`).finally(
      () =>
       {
         this.changeBookEvent.emit();
         window.scrollTo(0,0);
      });
  }
}
