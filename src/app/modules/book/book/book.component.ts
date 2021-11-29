import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { UserStatusArray } from '../../../models/user.model';
import { Book } from '../../../models/book.model';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public name: string;
  public imageSrc: string;
  public description: string;
  public price: number;
  public bookId: number;
  public author: string;
  public userId: number;
  @Input() public book: Book;
  public userStatus: number;
  public allUserStatus = UserStatusArray;

  public constructor(
    private router:Router,
    private orderService: OrderService,
    private authService: AuthService) {}

  public ngOnInit(): void {
    this.setBook();
    this.userId = this.authService.getUserId();
    const status = this.authService.getUserStatus();
    for (let i = 0; i < this.allUserStatus.length; i ++){
      if (this.allUserStatus[i] === status){
        this.userStatus = i;
      }
    }
  }

  private setBook(): void {
    this.bookId = this.book.bookId;
    this.name = this.book.name;
    this.description= this.book.description;
    this.price = this.book.price;
    this.imageSrc = this.book.imageUrl;
    this.author = this.book.author;
  }

  public visitPage(): void{
    this.router.navigate([`books/${this.bookId}`]);
  }

  public addToOrderList(): void{
    this.orderService.increaseOrder({
      userId: this.userId,
      bookId: this.bookId
    }).subscribe();
  }

}
