import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-selection',
  templateUrl: './order-selection.component.html',
  styleUrls: ['./order-selection.component.scss']
})
export class OrderSelectionComponent implements OnInit {
  public isAdmin = false;

  public constructor(
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
  }

}
