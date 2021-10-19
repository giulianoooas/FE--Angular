import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryElementComponent } from './category-element/category-element.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarModule } from '../car/car.module';
import { CategoryListComponent } from './category-list/category-list.component';



@NgModule({
  declarations: [
    CategoryElementComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CarModule
  ]
})
export class CategoryModule { }
