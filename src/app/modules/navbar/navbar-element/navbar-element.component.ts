import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../../models/navbar.model';

@Component({
  selector: 'app-navbar-element',
  templateUrl: './navbar-element.component.html',
  styleUrls: ['./navbar-element.component.scss']
})
export class NavbarElementComponent {
  @Input()public navbarElement: Navbar;

  public constructor(private router: Router) { }

  public navigate(): void{
    this.router.navigate([this.navbarElement.url]);
  }
}
