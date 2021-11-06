import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignUpPageComponent } from './login-sign-up-page/login-sign-up-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    LoginSignUpPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AuthModule { }
