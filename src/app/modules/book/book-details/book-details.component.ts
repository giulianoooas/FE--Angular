import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  public bookId: number;
  public categoryName: string;
  public userId: number;
  public isAdmin: boolean;
  public hasComments = true;

  public constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.setBook();
    this.setUser();
  }

  private setUser(): void{
    this.userId = this.authService.getUserId();
    this.isAdmin= this.authService.getIsAdmin();
  }

  private setBook(): void{
    this.bookId = Number(this.route.snapshot.paramMap.get('bookId'));
    this.bookService.getBookById(this.bookId).subscribe((book) => {
      if (!!book){
        this.book = book.book;
        this.categoryName = book.categoryName;
      }
    })
  }

  public goBooksDashboard(): void{
    this.router.navigate(['/books']);
  }

  public deleteBook(): void{
    this.bookService.deleteBook(this.bookId).subscribe(() => {
      this.goBooksDashboard();
    });
  }

  public setHasComments(hasComments: boolean): void{
    this.hasComments = hasComments;
  }

  public editBook(): void{
    this.router.navigateByUrl(`books/${this.bookId}/edit`);
  }
}
