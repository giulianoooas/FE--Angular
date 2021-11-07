import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarFilter } from '../../../models/car.model';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.scss']
})
export class CarFilterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    minPrice: new FormControl(0)
  });
  private filter: CarFilter = {
    minPrice: 0,
    name: ''
  }
  @Output() public setFilter: EventEmitter<CarFilter>=
    new EventEmitter<CarFilter>();

  public ngOnInit(): void {
    this.setFormControlSubscription();
  }

  private setFormControlSubscription(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        this.filter.name = data.name;
        this.filter.minPrice = data.minPrice;
        this.setFilterEmit();
      })
    );
  }

  private setFilterEmit(): void{
    this.setFilter.emit(this.filter);
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
