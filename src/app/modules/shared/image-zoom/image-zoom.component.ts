import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit, AfterViewInit {
  imageSrc = "assets/images/GiulianoStore.png";
  public imageSize = 700;
  private image = document.getElementById('image');

  public constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {imageUrl:string}){}


  public   ngAfterViewInit(): void {
    this.image = document.getElementById('image');
  }

  public closeDialog(): void{
    this.dialog.closeAll();
  }

  public ngOnInit(): void{
    if (this.data.imageUrl){
      this.imageSrc = this.data.imageUrl;
    }
  }

  public zoomIn(): void{
    if (this.imageSize < 2000){
      this.imageSize += 100;
    }
    this.setSize();
  }

  public zoomOut(): void{
    if (this.imageSize > 200){
      this.imageSize -= 100;
    }
    this.setSize();
  }

  public setSize(): void{
    if (this.image?.style){
      this.image.style.width = `${this.imageSize}px`;
      this.image.style.height = `${this.imageSize}px`;
    }
  }

}
