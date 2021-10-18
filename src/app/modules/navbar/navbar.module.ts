import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarElementComponent } from './navbar-element/navbar-element.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarElementComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
