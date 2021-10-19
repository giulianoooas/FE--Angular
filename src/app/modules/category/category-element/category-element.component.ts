import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-element',
  templateUrl: './category-element.component.html',
  styleUrls: ['./category-element.component.scss']
})
export class CategoryElementComponent implements OnInit {
  @Input() public category: Category;

  public constructor() { }

  public ngOnInit(): void {
  }

}
