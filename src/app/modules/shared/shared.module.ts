import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PricePredictComponent } from './price-predict/price-predict.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderListAddedPanelComponent } from './order-list-added-panel/order-list-added-panel.component';



@NgModule({
  declarations: [
    ImageZoomComponent,
    PricePredictComponent,
    OrderListAddedPanelComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    ImageZoomComponent,
    OrderListAddedPanelComponent
  ]
})
export class SharedModule { }
