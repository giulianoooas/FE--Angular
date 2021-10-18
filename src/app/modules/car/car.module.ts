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



@NgModule({
  declarations: [CarComponent, CarListComponent, CarDetailsComponent, CommentComponent, CommentsListComponent],
  imports: [
    CommonModule, RouterModule, HttpClientModule, MatIconModule, MatButtonModule
  ]
})
export class CarModule { }
