import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderElementComponent } from './order-element/order-element.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderElementComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class OrderModule { }
