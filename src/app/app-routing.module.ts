import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BookGuard } from './guards/book.guard';
import { CustomerGuard } from './guards/customer.guard';
import { LibraryGuard } from './guards/library.guard';
import { LoginSignUpPageComponent } from './modules/auth/login-sign-up-page/login-sign-up-page.component';
import { UserProfileComponent } from './modules/auth/user-profile/user-profile.component';
import { BookCreateComponent } from './modules/book/book-create/book-create.component';
import { BookDetailsComponent } from './modules/book/book-details/book-details.component';
import { BookListComponent } from './modules/book/book-list/book-list.component';
import { CategoryListComponent } from './modules/category/category-list/category-list.component';
import { OrderListComponent } from './modules/order/order-list/order-list.component';
import { PricePredictComponent } from './modules/shared/price-predict/price-predict.component';

const routes: Routes = [
    {
      path: 'user/:userId',
      component: UserProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginSignUpPageComponent
    },
    {
      path: 'sing-up',
      component: LoginSignUpPageComponent
    },
    {
      path: '',
      redirectTo: 'books',
      pathMatch: 'full',
    },
    {
      path: 'price-predict',
      component: PricePredictComponent,
      canActivate: [LibraryGuard]
    },
    {
      path: 'books',
      children:[
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'create',
        component: BookCreateComponent,
        canActivate: [AuthGuard, LibraryGuard]
      },
      {
        path: ':bookId',
        canActivate: [BookGuard],
        children:[
          {
            path: '',
            component: BookDetailsComponent,
          },
          {
            path: 'edit',
            component: BookCreateComponent,
            canActivate: [AuthGuard, LibraryGuard]
          }
        ]
        }

      ]
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'orders/:userId',
    component: OrderListComponent,
    canActivate: [AuthGuard, CustomerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
