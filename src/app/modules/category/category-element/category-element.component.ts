import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-element',
  templateUrl: './category-element.component.html',
  styleUrls: ['./category-element.component.scss']
})
export class CategoryElementComponent  {
  @Input() public category: Category;
  public cars: Car[] = [];
  public showCars = false;

  public constructor(private categoryService: CategoryService){}

  public getCars(): void{
    this.showCars = true;
    this.categoryService.getAllCarOfCategory(this.category.categoryId).subscribe((cars) => {
      this.cars = cars;
    })
  }
}
