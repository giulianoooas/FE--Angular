import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];

  public constructor(private categoryService: CategoryService) { }

  public ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }
}
