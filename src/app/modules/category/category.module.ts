import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarModule } from '../car/car.module';
import { CategoryElementComponent } from './category-element/category-element.component'
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryCreateComponent } from './category-create/category-create.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryElementComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CarModule,
    HttpClientModule,
    ReactiveFormsModule
  ]})
export class CategoryModule { }
