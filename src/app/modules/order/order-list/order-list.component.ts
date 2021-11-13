import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getCars();
  }

  private getCars(): void{
    this.orderService.getAllOrderOfUser(this.userId).subscribe(
      (orderBooks) =>{
        this.orderBooks = orderBooks;
        for (const order of orderBooks){
          this.totalPrice += order.price * order.numberOfElements;
        }
      }
    )
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
