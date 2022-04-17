import {  Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fb from  'fabric';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit {
  imageSrc = "assets/images/GiulianoStore.png";
  public imageSize = 700;
  private canvas: fb.fabric.Canvas;
  private image: fb.fabric.Image;
  private mousePressed = false;

  public constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {imageUrl:string}){}


  public closeDialog(): void{
    this.dialog.closeAll();
  }

  public ngOnInit(): void{
    if (this.data.imageUrl){
      this.imageSrc = this.data.imageUrl;
      this.canvas = new fb.fabric.Canvas('canvas',{
        backgroundImage: this.imageSrc,
        width: 600,
        height: 600
      });
      this.canvas.defaultCursor = 'grab';
      this.setCanvasImage();
      this.setCanvasEvents();
      this.canvas.renderAll();
    }
  }

  private setScaleNormal(): void{
    const scaleX = this.canvas.getWidth() / (this.image.width ?? 1);
    this.canvas.setZoom(scaleX);
  }

  private setCanvasImage(): void{
    fb.fabric.Image.fromURL(this.imageSrc, (image) => {
      this.image = image;
      this.setScaleNormal();
    });
  }

  private setCanvasEvents(): void{
    this.canvas.on('mouse:move', (event)=> {
      if (this.mousePressed){
        const mEvent = event.e;
        const delta = new fb.fabric.Point(mEvent.movementX,mEvent.movementY);
        this.canvas.relativePan(delta);
      }
    });

    this.canvas.on('mouse:up', ()=> {
      this.mousePressed = false;
    });

    this.canvas.on('mouse:down', ()=> {
      this.mousePressed = true;
    });
  }

  public zoomIn(): void{
    this.canvas.setZoom(Math.min(this.canvas.getZoom()+  0.1,3));
  }

  public zoomOut(): void{
    this.canvas.setZoom(Math.max(this.canvas.getZoom() - 0.1,0.1));
  }
}
