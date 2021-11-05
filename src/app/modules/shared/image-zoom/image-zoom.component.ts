import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit {
  public imageSrc = 'assets/images/sigla.png';

  public constructor(private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any){}

  public closeDialog(): void{
    this.dialog.closeAll();
  }

  public ngOnInit(): void{
    if (this.data.imageUrl){
      this.imageSrc = this.data.imageUrl;
    }
  }
}
