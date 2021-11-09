import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

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
  @Input() public book: Book;

  public constructor(
    private router:Router) {}

  public ngOnInit(): void {
    this.setBook();
  }

  private setBook(): void {
    this.bookId = this.book.bookId;
    this.name = this.book.name;
    this.description= this.book.description;
    this.price = this.book.price;
    this.imageSrc = this.book.imageUrl;
  }

  public visitPage(): void{
    this.router.navigate([`books/${this.bookId}`]);
  }

}
