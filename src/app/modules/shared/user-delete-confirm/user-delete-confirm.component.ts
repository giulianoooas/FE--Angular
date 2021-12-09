import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete-confirm',
  templateUrl: './user-delete-confirm.component.html',
  styleUrls: ['./user-delete-confirm.component.scss']
})
export class UserDeleteConfirmComponent implements OnInit {
  private userId: number;

  public constructor(
    @Inject(MAT_DIALOG_DATA) private data: {userId:number},
     private userService: UserService,
     private authService: AuthService,
     private dialogService: MatDialog,
     private router: Router) { }

  public ngOnInit(): void {
    this.userId = this.data.userId;
  }

  public cancel(): void{
    this.dialogService.closeAll();
  }

  public deleteUser(): void{
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.authService.logOut();
      this.dialogService.closeAll();
      this.router.navigateByUrl('login');
    })
  }
}
