import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { Category } from '../../../models/category.model';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public categoryIdForShowingBooks = -1;
  public booksToShow: Book[] = [];
  public userId: number;

  public constructor(private categoryService: CategoryService, private authService: AuthService) { }

  public ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.userId = this.authService.getUserId();
  }

  public showBooks(categoryId: number): void{
    this.categoryIdForShowingBooks = categoryId;
    this.categoryService.getAllBookOfCategory(categoryId).subscribe((books) => {
      this.booksToShow = books;
    })
  }

  public deleteCategory(categoryId: number): void{
    this.categoryService.deleteCategory(categoryId).subscribe((categories) => {
      this.categories = categories;
    })
  }

  public editCategory(category: Category): void{
    this.categoryService.editCategory(category).subscribe((categoryUpdated) => {
      for (const category of this.categories){
        if (category.categoryId == categoryUpdated.categoryId){
          category.name= categoryUpdated.name;
          break;
        }
      }
    })
  }

  public createCategory(category: Category): void{
    this.categoryService.createCategory(category).subscribe((category) => {
      this.categories.push(category);
    })
  }
}
