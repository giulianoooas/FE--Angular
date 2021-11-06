import { Component, OnInit } from '@angular/core';
import { NAVBAR_ANONYMOUS_CONSTANT, NAVBAR_USER_CONSTANT } from '../../../constants/navbar.constant';
import { AuthService } from '../../../services/auth.service';
import { Navbar } from '../../../models/navbar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public navbarElements: Navbar[];

  public constructor(private authService: AuthService){}

  public ngOnInit(): void{
    if (this.authService.getUserId() >= 0){
      this.navbarElements = NAVBAR_USER_CONSTANT;
    } else {
      this.navbarElements = NAVBAR_ANONYMOUS_CONSTANT;
    }
  }

}
