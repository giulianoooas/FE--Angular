import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-category-name',
  templateUrl: './car-category-name.component.html',
  styleUrls: ['./car-category-name.component.scss']
})
export class CarCategoryNameComponent {
  @Input() categoryName: string = '';
}
