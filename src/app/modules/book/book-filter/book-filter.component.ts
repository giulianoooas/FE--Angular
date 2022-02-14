import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookFilter } from '../../../models/book.model';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    minPrice: new FormControl(0)
  });
  private filter: BookFilter = {
    minPrice: 0,
    name: ''
  }
  @Output() public setFilter: EventEmitter<BookFilter>=
    new EventEmitter<BookFilter>();

  public ngOnInit(): void {
    this.setFormControlSubscription();
  }

  private setFormControlSubscription(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        this.filter.name = data.name;
        if (data.minPrice < 0){
          this.formGroup.controls['minPrice'].setValue(0);
        }
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
