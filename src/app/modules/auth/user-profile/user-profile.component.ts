import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public logoUrl = './assets/images/user-icon.png';

  public constructor(
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.setUser();
    console.log(this.user);

  }

  private setUser(): void{
    this.user = this.authService.getUser();
    if (this.user.logoUrl){
      this.logoUrl = this.user.logoUrl;
    }
  }

}
