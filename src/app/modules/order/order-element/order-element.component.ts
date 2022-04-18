import { formatDate } from '../../../utils/format-date';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderBook } from '../../../models/order-book.model';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-element',
  templateUrl: './order-element.component.html',
  styleUrls: ['./order-element.component.scss']
})
export class OrderElementComponent implements OnInit{
  public date = '';
  @Input() userId: number;
  @Input() orderBook: OrderBook;
  @Input() index: number;
  @Output() decreaseOrderNumberEvent: EventEmitter<number>=
    new EventEmitter<number>();
  @Output() increaseOrderNumberEvent: EventEmitter<number>=
    new EventEmitter<number>();

  public constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  public ngOnInit(): void{
    this.date = formatDate(new Date(this.orderBook.date));
  }

  public goToAllBooks(): void{
    this.router.navigate(['books']);
  }

  public decreaseOrderNumber(): void{
    this.orderService.decreaseOrder({
      userId: this.userId,
      bookId: this.orderBook.bookId
    }).subscribe(() => {
      this.decreaseOrderNumberEvent.emit(this.index);
    })
  }

  public increaseOrderNumber(): void{
    this.orderService.increaseOrder({
      userId: this.userId,
      bookId: this.orderBook.bookId
    }).subscribe(() => {
      this.increaseOrderNumberEvent.emit(this.index);
    })
  }
}
