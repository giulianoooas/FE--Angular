import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  public car: Car;
  public carId: number;
  public categoryName: string;
  public messagesShowCommentsButton = ['Show', 'Hide'];
  public optionShowComments = 1;
  public userId: number;
  public isAdmin: boolean;

  public constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.setCar();
    this.setUser();
  }

  private setUser(): void{
    this.userId = this.authService.getUserId();
    this.isAdmin= this.authService.getIsAdmin();
  }

  private setCar(): void{
    this.carId = Number(this.route.snapshot.paramMap.get('carId'));
    this.carService.getCarById(this.carId).subscribe((car) => {
      if (!!car){
        this.car = car.car;
        this.categoryName = car.categoryName;
      }
    })
  }

  public goCarsDashboard(): void{
    this.router.navigate(['/cars']);
  }

  public deleteCar(): void{
    this.carService.deleteCar(this.carId).subscribe(() => {
      this.goCarsDashboard();
    });
  }

  public editCar(): void{
    this.router.navigateByUrl(`cars/${this.carId}/edit`);
  }
}
