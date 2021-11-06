import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignUpPageComponent } from './login-sign-up-page/login-sign-up-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LoginSignUpPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AuthModule { }
