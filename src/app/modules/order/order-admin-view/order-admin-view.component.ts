import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-admin-view',
  templateUrl: './order-admin-view.component.html',
  styleUrls: ['./order-admin-view.component.scss']
})
export class OrderAdminViewComponent implements OnInit {
  public users: {
    name: string,
    userId: number
  }[] = [];
  public showUserOrders = new Map<number, boolean>();

  public constructor(
    private readonly userService: UserService
  ) { }

  public ngOnInit(): void {
    this.setUsers();
  }

  public setUsers(): void{
    this.userService.getAllUsersInfo().subscribe(
      (users) => {
        this.users = users;

        for (const user of this.users){
          this.showUserOrders.set(user.userId,false);
      }
      }
    );
  }

  public showHideUserOrder(userId: number): void{
    const value = this.showUserOrders.get(userId) ?? false;
    this.showUserOrders.set(userId, !value);
  }
}
