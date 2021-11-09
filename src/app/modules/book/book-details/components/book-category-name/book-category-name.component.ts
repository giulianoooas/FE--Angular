import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-category-name',
  templateUrl: './book-category-name.component.html',
  styleUrls: ['./book-category-name.component.scss']
})
export class BookCategoryNameComponent {
  @Input() categoryName: string = '';
}
