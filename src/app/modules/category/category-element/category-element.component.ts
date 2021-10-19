import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAX_INPUT_CONSTANT_LENGTH_CATEGORIES } from 'src/app/constants/comment-max-length.constant';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-element',
  templateUrl: './category-element.component.html',
  styleUrls: ['./category-element.component.scss']
})
export class CategoryElementComponent implements OnInit, OnDestroy {
  @Input() public category: Category;
  @Input() public showCars = false;
  @Output() public showCarsEvent: EventEmitter<number>=
    new EventEmitter<number>();
  @Output() public deleteCategoryEvent: EventEmitter<number>=
    new EventEmitter<number>();
  @Output() public editCategoryEvent: EventEmitter<Category>=
    new EventEmitter<Category>();

  public maxLength = MAX_INPUT_CONSTANT_LENGTH_CATEGORIES;
  public isEditable = false;
  public formGroup: FormGroup;
  public editedCategory: Category;
  public subscription: Subscription= new Subscription();

  public ngOnInit(): void{
    this.editedCategory = {...this.category};
    this.formGroup =new FormGroup({
      name: new FormControl(this.category.name)
    });
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((category)=> {
        if (!!category.name){
          this.editedCategory.name = category.name;
        }
      })
    );
  }

  public requestToShowCars(): void{
    this.showCarsEvent.emit(this.category.categoryId);
  }

  public makeEditable(): void{
    this.isEditable = true;
  }

  public makeUnEditable(): void{
    this.editedCategory.name = this.category.name;
    this.formGroup.controls['name'].setValue(this.category.name);
    this.isEditable = false;
  }

  public deleteCategory(): void{
    this.showCarsEvent.emit(-1);
    this.deleteCategoryEvent.emit(this.category.categoryId);
  }

  public editCategory(): void{
    this.editCategoryEvent.emit(this.editedCategory);
    this.category.name = this.editedCategory.name;
    this.makeUnEditable();
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
