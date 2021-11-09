import { Component, OnInit } from '@angular/core';
import { Book, BookFilter } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
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

}
