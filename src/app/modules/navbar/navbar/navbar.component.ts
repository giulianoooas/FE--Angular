import { Component } from '@angular/core';
import { NAVBAR_CONSTANT } from 'src/app/constants/navbar.constant';
import { Navbar } from 'src/app/models/navbar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navbarElements: Navbar[] = NAVBAR_CONSTANT;

}
