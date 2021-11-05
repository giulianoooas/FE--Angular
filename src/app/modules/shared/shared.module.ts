import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import {  MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ImageZoomComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ImageZoomComponent
  ]
})
export class SharedModule { }
