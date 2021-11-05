import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { Category } from 'src/app/models/category.model';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageZoomComponent } from '../../shared/image-zoom/image-zoom.component';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss']
})
export class CarCreateComponent implements OnInit, OnDestroy {
  public errorMessage: string[] = [];
  public car: Car ={
    name: '',
    carId: -1,
    categoryId: -1,
    imageUrl: '',
    description: '',
    price: -1
  };
  private carId = -1;
  public categories:Category[] = [];
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(-1),
    description: new FormControl(''),
    price: new FormControl(0),
    imageUrl: new FormControl('')
  });
  public isEditMode = false;
  public subscription: Subscription =
    new Subscription();

  public constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.setEditMode();
    this.setCar();
    this.createFormSubscription();
    this.getAllCategories();
  }

  private getAllCategories(): void{
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  private setEditMode(): void{
    if (this.router.url.includes('edit')){
      this.isEditMode = true;
    }
  }

  private createFormSubscription(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        this.car.categoryId = data.categoryId;
        this.car.description = data.description;
        this.car.imageUrl = data.imageUrl;
        this.car.name = data.name;
        this.car.price = data.price;
      })
    );
  }

  private setCar(): void{
    if (this.isEditMode){
      this.carId = Number(this.route.snapshot.paramMap.get('carId'));
      this.carService.getCarById(this.carId).subscribe(({car,categoryName}) => {
        this.formGroup.controls['name'].setValue(car.name);
        this.formGroup.controls['price'].setValue(car.price);
        this.formGroup.controls['categoryId'].setValue(car.categoryId);
        this.formGroup.controls['description'].setValue(car.description);
        this.formGroup.controls['imageUrl'].setValue(car.imageUrl);
        this.carId = car.carId;
        this.car.carId = car.carId;
      })
    }
  }

  private validateCar(): boolean{
    this.errorMessage = [];
    this.validateName();
    this.validateDescription();
    if (this.car.price <= 0){
      this.errorMessage.push('  Price must be strict positive.');
    }
    if (this.car.categoryId < 0){
      this.errorMessage.push('  Car must have a category.');
    }
    if (this.car.imageUrl.length == 0){
      this.errorMessage.push('  Car must have an image.');
    }
    return this.errorMessage.length == 0;
  }

  private validateName(): void{
    if (this.car.name.length == 0){
      this.errorMessage.push('  Name is empty.\n');
      return;
    }
    for (let i=0; i< this.car.name.length; i ++){
      const chr = this.car.name.charAt(i);
      if (chr !== '')
        return;
    }
    this.errorMessage.push('  Name must have not only spaces.\n');
  }

  private validateDescription(): void{
    if (this.car.description.length == 0){
      this.errorMessage.push('  Description is empty.\n');
      return;
    }
    for (let i=0; i< this.car.description.length; i ++){
      const chr = this.car.description.charAt(i);
      if (chr !== '')
        return;
    }
    this.errorMessage.push('  Description must have not only spaces.\n');
  }

  public createCar(): void{
    if (this.validateCar())
      this.carService.createCar(this.car).subscribe((car) => {
        this.router.navigateByUrl(`cars/${car.carId}`);
      })
  }

  public editCar(): void{
    if (this.validateCar())
      this.carService.editCar(this.car).subscribe((car) => {
        this.router.navigateByUrl(`cars/${car.carId}`);
      })
  }

  public openDialog(): void{
    this.dialog.open(ImageZoomComponent, {
      height:'700px',
      width:'700px',
      data: {
        imageUrl: this.car.imageUrl
      }
    },)
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
