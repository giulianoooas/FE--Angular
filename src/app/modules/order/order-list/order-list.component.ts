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

  public ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getOrders();
    this.getBooks();
  }

  private getBooks(): void{
    this.bookService.getBooks().subscribe((books) => {
      for(const book of books){
        if (this.booksRec.length >= 4){
          break;
        }
        this.booksRec.push(book);
      }
    });
  }

  private getOrders(): void{
    this.orderService.getAllOrderOfUser(this.userId).subscribe(
      (orderBooks) =>{
        this.orderBooks = orderBooks;
        for (const order of orderBooks){
          this.totalPrice += order.price * order.numberOfElements;
        }
      }
    )
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
