import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarGuard } from './guards/car.guard';
import { CarDetailsComponent } from './modules/car/car-details/car-details.component';
import { CarListComponent } from './modules/car/car-list/car-list.component';
import { CategoryListComponent } from './modules/category/category-list/category-list.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'cars',
      pathMatch: 'full',
    },
    {
      path: 'cars',
      children:[
      {
        path: '',
        component: CarListComponent
      },
      {
        path: ':carId',
        component: CarDetailsComponent,
        canActivate: [CarGuard]
      }
      ]
  },
  {
    path: 'categories',
    component: CategoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
