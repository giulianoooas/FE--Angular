import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { OrderBook } from '../../../models/order-book.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public userId: number;
  public orderBooks: OrderBook[] = [];
  public totalPrice = 0;
  public booksRec: Book[] = [];

  public constructor(
    private bookService: BookService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    await this.setOrders();
    this.setBooks();
  }

  private setBooks(): void{
    const bookExistsId = new Map<number, boolean>();

    this.orderBooks.forEach((book) => {
      bookExistsId.set(book.bookId,true);
    });

    let maxBooks = 3;

    if (this.orderBooks.length > 3){
      maxBooks = 4;
    }

    this.bookService.getBooks().subscribe((books) => {
      for(const book of books){
        if (this.booksRec.length >= maxBooks){
          break;
        }
        if (!bookExistsId.get(book.bookId)){
          this.booksRec.push(book);
        }
      }
    });
  }

  private async setOrders(): Promise<void>{
    this.orderBooks = await this.orderService.getAllOrderOfUser(this.userId).toPromise();
    for (const order of this.orderBooks){
      this.totalPrice += order.price * order.numberOfElements;
    }
  }



  public navigateToBook(bookId: number): void{
    this.router.navigateByUrl(`books/${bookId}`)
  }

  public refresh(index: number): void{
    this.orderBooks[index].numberOfElements --;
    this.totalPrice -= this.orderBooks[index].price;
    if (this.orderBooks[index].numberOfElements <= 0){
      const orders = [];
      for (let i = 0; i < this.orderBooks.length; i ++){
        if (i == index){
          continue;
        }
        orders.push(this.orderBooks[i]);
      }
      this.orderBooks = orders;
    }
  }

}
