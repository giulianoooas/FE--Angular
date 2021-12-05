import { Component, OnInit } from '@angular/core';
import { Book, BookFilter } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public message = 'The book was added!';
  public isAdded = false;
  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  public constructor(private bookService: BookService) { }

  public ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filteredBooks = books;
    });
  }

  public setFilter(filter: BookFilter): void{
    this.filteredBooks = [];
    for (const book of this.books){
      if (book.name.includes(filter.name)
        && book.price >= filter.minPrice){
        this.filteredBooks.push(book);
      }
    }
  }

  public showPanel(): void{
    let action = setInterval(() => {
      if (!this.isAdded){
        this.isAdded = true;
      } else {
        this.isAdded = false;
        clearInterval(action);
      }
    },1000);
  }
}
