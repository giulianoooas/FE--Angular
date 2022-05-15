import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStatusArray } from 'src/app/models/user.model';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderService } from 'src/app/services/order.service';
import { Book } from '../../../models/book.model';
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  public isAdded = false;
  public book: Book;
  public bookId: number;
  public categoryName: string;
  public userId: number;
  public isAdmin: boolean;
  public hasComments = true;
  public userStatus: number;
  public isCustomer = false;
  public isLibrary = false;
  public allUserStatus = UserStatusArray;
  public seeAlsoBooks: Book[] = [];

  public constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private dialogService: DialogService,
    private titleService: Title) { }

  public ngOnInit(): void {
    this.setBook();
    this.setSeeAlsoBooks();
    this.setUser();
  }

  private setSeeAlsoBooks(): void{
    this.bookService.getSeeAlsoBooks(this.bookId).subscribe(
      (books) => {
        this.seeAlsoBooks = books;
      }
    );
  }

  private setUser(): void{
    this.userId = this.authService.getUserId();
    this.isAdmin= this.authService.getIsAdmin();
    this.isCustomer = this.authService.getIsCustomer() || this.authService.getIsAdmin();
    this.isLibrary = this.authService.getIsLibrary();
    const status = this.authService.getUserStatus();
    for (let i = 0; i < this.allUserStatus.length; i ++){
      if (this.allUserStatus[i] === status){
        this.userStatus = i;
      }
    }
  }

  public setBook(): void{
    this.bookId = Number(this.route.snapshot.paramMap.get('bookId'));
    this.bookService.getBookById(this.bookId).subscribe((book) => {
      if (!!book){
        this.book = book.book;
        this.categoryName = book.categoryName;
        this.titleService.setTitle(book.book.name);
      }
    })
    this.setSeeAlsoBooks();
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

  public addToOrderList(): void{
    this.orderService.increaseOrder({
      userId: this.userId,
      bookId: this.bookId
    }).subscribe(() => {
      this.showPanel();
    });
  }

  public openDialog(): void{
    this.dialogService.openImageZoom(this.book.imageUrl);
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
