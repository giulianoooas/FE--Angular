import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAX_INPUT_CONSTANT_LENGTH_CATEGORIES } from 'src/app/constants/input-max-length.constant';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  public maxLength = MAX_INPUT_CONSTANT_LENGTH_CATEGORIES;
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('')
  });
  private createdCategory: Category = {
    name: '',
    categoryId: -1,
    userId: this.authService.getUserId()
  }
  @Output() public createCategoryEvent: EventEmitter<Category> =
    new EventEmitter<Category>();
  private subscription: Subscription = new Subscription();

  public constructor(private authService: AuthService){}

  public ngOnInit(): void {
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((category) => {
        if (!!category.name){
          this.createdCategory.name = category.name;
        }
      })
    );
  }

  public clearText(): void{
    this.createdCategory.name = '';
    this.formGroup.controls['name'].setValue('');
  }

  public createCategory(): void{
    if (this.createdCategory.name === '')
      return;
    this.createCategoryEvent.emit(this.createdCategory);
    this.clearText();
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
