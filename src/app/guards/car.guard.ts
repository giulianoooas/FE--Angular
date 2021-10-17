import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarService } from '../services/car.service';

@Injectable({
  providedIn: 'root'
})
export class CarGuard implements CanActivate {
  public constructor(private carService: CarService, private location: Location){}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    const carId = Number(route.paramMap.get('carId'));
    return this.existsCar(carId);
  }

  private  existsCar(carId: number): Observable<boolean>{
    return  this.carService.existsCar(carId).pipe(tap((data) => {
      if (data == false)
        this.location.back();
    }));
  }

}

