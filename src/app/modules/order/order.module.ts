import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderElementComponent } from './order-element/order-element.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderSelectionComponent } from './order-selection/order-selection.component';
import { OrderAdminViewComponent } from './order-admin-view/order-admin-view.component';
import { OrderUserNameComponent } from './order-user-name/order-user-name.component';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderElementComponent,
    OrderSelectionComponent,
    OrderAdminViewComponent,
    OrderUserNameComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class OrderModule { }
