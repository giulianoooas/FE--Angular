import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  public cars: Car[] = [];
  public constructor(private carService: CarService) { }

  public ngOnInit(): void {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

}
