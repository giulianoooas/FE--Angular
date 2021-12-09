import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from '../modules/shared/image-zoom/image-zoom.component';
import { UserDeleteConfirmComponent } from '../modules/shared/user-delete-confirm/user-delete-confirm.component';

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
    });
  }

  public openDeleteUser(userId: number): void{
    this.dialog.open(UserDeleteConfirmComponent, {
      height:'90px',
      width:'300px',
      data: {
        userId
      }
    });
  }
}
