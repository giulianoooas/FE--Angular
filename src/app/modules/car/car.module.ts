import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CarListComponent } from './car-list/car-list.component';



@NgModule({
  declarations: [CarComponent, CarListComponent],
  imports: [
    CommonModule, RouterModule, HttpClientModule, MatIconModule, MatButtonModule
  ]
})
export class CarModule { }
