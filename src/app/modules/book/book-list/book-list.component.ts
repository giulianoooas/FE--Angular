import { Component, OnInit } from '@angular/core';
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
      const min = Math.min(book.name.length, filter.name.length);
      if ((
        book.name.toLowerCase().includes(filter.name.toLowerCase()) ||
        Math.abs(min - this.computeDistanceNamesDP(book.name,filter.name)) < 2 // are aproape toate caracterele la fel
      )
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

  public computeDistanceNamesDP(str1: string, str2: string): number{
    const matrix = [];
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    for (let i = 0; i < str1.length + 1; i ++){
      const newMatrix = [];
      for (let j = 0; j < str2.length + 1; j ++){
        newMatrix.push(0);
      }
      matrix.push(newMatrix);
    }

    for (let i = 0; i < str1.length; i ++){
      for (let j = 0; j < str2.length; j ++){
        if (str1[i] == str2[j]){
          matrix[i+1][j+1] = matrix[i][j] + 1;
        } else {
          matrix[i+1][j+1] = Math.max(matrix[i][j+1],matrix[i+1][j]);
        }
      }
    }

    return matrix[str1.length][str2.length];
  }

  private lev(str1: string, str2: string): number{ //https://en.wikipedia.org/wiki/Levenshtein_distance
    if (str1 === '' || str2 === ''){
      return Math.max(str1.length, str2.length);
    }

    if (str1[0] === str2[0]){
      return this.lev(str1.substring(1,str1.length) , str2.substring(1,str2.length));
    }

    return 1 + Math.min(
      this.lev(str1.substring(1,str1.length) , str2.substring(1,str2.length)),
      this.lev(str1 , str2.substring(1,str2.length)),
      this.lev(str1.substring(1,str1.length) , str2)
    );
  }
}
