import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  public car: Car;
  public carId: number;
  public isShowComments = true;
  public messagesShowCommentsButton = ['Show', 'Hide'];
  public optionShowComments = 1;

  public constructor(private carService: CarService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit(): void {
    this.setCar();
  }

  private setCar(): void{
    this.carId = Number(this.route.snapshot.paramMap.get('carId'));
    this.carService.getCarById(this.carId).subscribe((car) => {
      if (!!car)
      this.car = car;
    })
  }

  public goCarsDashboard(): void{
    this.router.navigate(['/cars']);
  }

  public showHideComments(): void{
    this.isShowComments = !this.isShowComments;
    this.optionShowComments = (this.optionShowComments + 1) % 2;
  }

}
