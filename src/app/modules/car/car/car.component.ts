import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public carId: string;

  public constructor(
    private carService: CarService,
    private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId') || '';
    this.setCar();
  }

  private setCar(): void {
    this.carService.getCarById(this.carId).subscribe((car: Car) => {
      this.name = car.name;
      this.description= car.description;
      this.price = car.price;
      this.imageSrc = car.imageUrl;
      console.log(car);
    });
  }

  public ngOnDestroy(): void{

  }

}
