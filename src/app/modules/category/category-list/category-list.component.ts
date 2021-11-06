import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public categoryIdForShowingCars = -1;
  public carsToShow: Car[] = [];
  public userId: number;

  public constructor(private categoryService: CategoryService, private authService: AuthService) { }

  public ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.userId = this.authService.getUserId();
  }

  public showCars(categoryId: number): void{
    this.categoryIdForShowingCars = categoryId;
    this.categoryService.getAllCarOfCategory(categoryId).subscribe((cars) => {
      this.carsToShow = cars;
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
