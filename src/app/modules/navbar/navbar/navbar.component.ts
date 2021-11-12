import { Component, OnDestroy, OnInit } from '@angular/core';
import { NAVBAR_ANONYMOUS_CONSTANT, NAVBAR_NO_LOGIN_CONSTANT, NAVBAR_USER_CONSTANT } from '../../../constants/navbar.constant';
import { AuthService } from '../../../services/auth.service';
import { Navbar } from '../../../models/navbar.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navbarElements: Navbar[];
  public email: string;
  public authNavbar: Navbar[];
  public subscription: Subscription = new Subscription();

  public constructor(private authService: AuthService,
        private router: Router){
        this.subscription.add(
          this.router.events.subscribe(() => {
            this.setNavbarElements();
          })
        )
  }

  public ngOnInit(): void{
    this.setNavbarElements();
    this.authNavbar = NAVBAR_NO_LOGIN_CONSTANT;
  }

  private setNavbarElements(): void{
    if (this.authService.getUserId() >= 0){
      this.navbarElements = [...NAVBAR_USER_CONSTANT];
      this.navbarElements.push({
        label: 'Order list',
        url: `/orders/${this.authService.getUserId()}`
      })
    } else {
      this.navbarElements = NAVBAR_ANONYMOUS_CONSTANT;
    }
    this.email = this.authService.getEmail();
  }

  public logOut(): void{
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
