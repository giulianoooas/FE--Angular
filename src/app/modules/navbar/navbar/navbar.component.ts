import { Component, OnDestroy, OnInit } from '@angular/core';
import { NAVBAR_ANONYMOUS_CONSTANT, NAVBAR_CUSTOMER_CONSTANT, NAVBAR_LIBRARY_CONSTANT, NAVBAR_NO_LOGIN_CONSTANT } from '../../../constants/navbar.constant';
import { AuthService } from '../../../services/auth.service';
import { Navbar } from '../../../models/navbar.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navbarElements: Navbar[];
  public showActionsUser = false;
  public nickname: string;
  public authNavbar: Navbar[];
  public subscription: Subscription = new Subscription();

  public constructor(
        private authService: AuthService,
        private eventService: EventService,
        private router: Router){
        this.subscription.add(
          this.router.events.subscribe(() => {
            this.setNavbarElements();
            this.setHighlightNavbar();
            this.showActionsUser = false;
          })
        )
  }

  public ngOnInit(): void{
    this.setNavbarElements();
    this.updateNickname();
    this.authNavbar = NAVBAR_NO_LOGIN_CONSTANT;
  }

  private updateNickname(): void{
    this.subscription.add(
      this.eventService.getData().subscribe(
        (data) => {
          this.nickname = data;
        }
      )
    );
  }

  private setNavbarElements(): void{
    if (this.authService.getUserId() >= 0){
      if (this.authService.getIsCustomer()){
        this.navbarElements = [...NAVBAR_CUSTOMER_CONSTANT];
        this.navbarElements.push({
          label: 'Order list',
          url: `/orders/${this.authService.getUserId()}`
        })
     } else if (this.authService.getIsLibrary()){
       this.navbarElements = [...NAVBAR_LIBRARY_CONSTANT];
     } else {
      this.navbarElements = [...NAVBAR_LIBRARY_CONSTANT];
      this.navbarElements.push({
        label: 'Order list',
        url: `/orders/${this.authService.getUserId()}`
      })
     }
    } else {
      this.navbarElements = NAVBAR_ANONYMOUS_CONSTANT;
    }
    this.nickname = this.authService.getNickname();
  }

  private setHighlightNavbar(): void{
    if (this.router.url.includes('forum')){
      for (const navbar of this.navbarElements){
        if (navbar.label === 'Forum'){
          navbar.highlight = true;
        } else {
          navbar.highlight = false;
        }
      }
    }

    if (this.router.url.includes('books')){
      const isCreate = this.router.url.includes('create');
      for (const navbar of this.navbarElements){
        if (!isCreate){
          if (navbar.label === 'Books'){
            navbar.highlight = true;
          } else {
            navbar.highlight = false;
          }
        } else {
          if (navbar.label === 'Create book'){
            navbar.highlight = true;
          } else {
            navbar.highlight = false;
          }
        }
      }
    }

    if (this.router.url.includes('categories')){
      for (const navbar of this.navbarElements){
        if (navbar.label === 'Categories'){
          navbar.highlight = true;
        } else {
          navbar.highlight = false;
        }
      }
    }

    if (this.router.url.includes('orders')){
      for (const navbar of this.navbarElements){
        if (navbar.label === 'Order list'){
          navbar.highlight = true;
        } else {
          navbar.highlight = false;
        }
      }
    }
  }

  public setShowActionUser(): void{
    this.showActionsUser = !this.showActionsUser;
  }

  public logOut(): void{
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  public redirectToUserProfile(): void{
    const userId = this.authService.getUserId();
    this.router.navigateByUrl(`user/${userId}`);
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
