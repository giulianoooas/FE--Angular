import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {
  public name: string;
  public imageSrc: string;
  public description: string;
  public price: number;
  public carId: number;
  @Input() public car: Car;

  public constructor(
    private router:Router) {}

  public ngOnInit(): void {
    this.setCar();
  }

  private setCar(): void {
    this.carId = this.car.carId;
    this.name = this.car.name;
    this.description= this.car.description;
    this.price = this.car.price;
    this.imageSrc = this.car.imageUrl;
  }

  public visitPage(): void{
    this.router.navigate([`${this.router.url}/${this.carId}`]);
  }

  public ngOnDestroy(): void{

  }

}
