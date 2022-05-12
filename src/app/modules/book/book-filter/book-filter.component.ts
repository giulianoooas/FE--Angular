import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { BookFilter } from '../../../models/book.model';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public categories: Category[];
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    category: new FormControl()
  });
  private filter: BookFilter = {
    minPrice: 0,
    maxPrice: 0,
    name: ''
  }
  @Output() public setFilter: EventEmitter<BookFilter>=
    new EventEmitter<BookFilter>();

  public constructor(private readonly categoryService: CategoryService){}

  public ngOnInit(): void {
    this.setFormControlSubscription();
    this.getAllCategories();
  }

  private getAllCategories(): void{
    this.categoryService.getAllCategories()
    .subscribe((categories) => {
      this.categories = categories;
      this.categories.push({
        categoryId: -1,
        name: 'All',
        userId: -1
      });
    })
  }

  private setFormControlSubscription(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        this.filter.name = data.name;
        if (data.minPrice < 0){
          data.minPrice = 0;
          this.formGroup.controls['minPrice'].setValue(0);
        }
        if (!!data.minPrice && data.maxPrice <=  data.minPrice){
          data.maxPrice = data.minPrice + 1;
          this.formGroup.controls['maxPrice'].setValue(data.maxPrice);
        }

        this.filter.category = data.category;
        this.filter.minPrice = data.minPrice;
        this.filter.maxPrice = data.maxPrice;
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
