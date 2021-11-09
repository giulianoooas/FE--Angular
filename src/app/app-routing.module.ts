import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BookGuard } from './guards/book.guard';
import { LoginSignUpPageComponent } from './modules/auth/login-sign-up-page/login-sign-up-page.component';
import { BookCreateComponent } from './modules/book/book-create/book-create.component';
import { BookDetailsComponent } from './modules/book/book-details/book-details.component';
import { BookListComponent } from './modules/book/book-list/book-list.component';
import { CategoryListComponent } from './modules/category/category-list/category-list.component';

const routes: Routes = [
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
      path: 'books',
      children:[
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'create',
        component: BookCreateComponent,
        canActivate: [AuthGuard]
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
            canActivate: [AuthGuard]
          }
        ]
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
