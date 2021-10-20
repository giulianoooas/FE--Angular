import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CommentComponent } from './car-details/components/comment/comment.component';
import { CommentsListComponent } from './car-details/components/comments-list/comments-list.component';
import { CommentCreateComponent } from './car-details/components/comment-create/comment-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { CarCategoryNameComponent } from './car-details/components/car-category-name/car-category-name.component';
import { CarCreateComponent } from './car-create/car-create.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CarComponent,
    CarListComponent,
    CarDetailsComponent,
    CommentComponent,
    CommentsListComponent,
    CommentCreateComponent,
    CarCategoryNameComponent,
    CarCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
    ],
  exports: [CarComponent]
})
export class CarModule { }
