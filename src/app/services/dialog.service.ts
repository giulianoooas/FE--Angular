import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from '../modules/shared/image-zoom/image-zoom.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private constructor(
    private dialog: MatDialog,
  ) { }

  public openImageZoom(imageUrl: string): void{
    this.dialog.open(ImageZoomComponent, {
      height:'800px',
      width:'700px',
      data: {
        imageUrl: imageUrl
      }
    },)
  }
}
