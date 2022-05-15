import { Component, OnInit } from '@angular/core';
import { AlgoService } from 'src/app/services/algo.service';
import { Book, BookFilter } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public isAdded = false;
  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  public constructor(
    private bookService: BookService,
    private algoService: AlgoService) { }

  public ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filteredBooks = books;
    });
  }

  public setFilter(filter: BookFilter): void{
    this.filteredBooks = [];
    for (const book of this.books){
      const min = Math.min(book.name.length, filter.name.length);
      if ((
        book.name.toLowerCase().includes(filter.name.toLowerCase()) ||
        Math.abs(min - this.algoService.computeDistanceNamesDP(book.name,filter.name)) < 2 // are aproape toate caracterele la fel
      ) && (
        book.categoryId === filter.category
        || filter.category === -1
        || !filter.category
      )
        && book.price >= (filter.minPrice ?? 0) &&
        (!filter.maxPrice || book.price <= filter.maxPrice)){
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
