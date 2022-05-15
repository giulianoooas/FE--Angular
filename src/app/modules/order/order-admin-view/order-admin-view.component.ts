import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlgoService } from 'src/app/services/algo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-admin-view',
  templateUrl: './order-admin-view.component.html',
  styleUrls: ['./order-admin-view.component.scss']
})
export class OrderAdminViewComponent implements OnInit, OnDestroy {
  public users: {
    name: string,
    userId: number
  }[] = [];
  public showingUsers: {
    name: string,
    userId: number
  }[] = [];
  public showUserOrders = new Map<number, boolean>();
  public filter = new FormGroup({
    userName: new FormControl('')
  });
  private subscription = new Subscription();

  public constructor(
    private readonly userService: UserService,
    private readonly algoService: AlgoService
  ) { }

  public ngOnInit(): void {
    this.setUsers();
    this.setShowingData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setUsers(): void{
    this.userService.getAllUsersInfo().subscribe(
      (users) => {
        this.users = users;
        this.showingUsers = users;

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

  private setShowingData(): void{
    this.subscription.add(
      this.filter.valueChanges.subscribe(
        (data: {userName: string}) => {
          this.showingUsers = this.users.filter((user) => {
            const min = Math.min(user.name.length, data.userName.length);

            return user.name.toLowerCase().includes(data.userName.toLowerCase()) ||
            Math.abs(min - this.algoService.computeDistanceNamesDP(user.name,data.userName)) < 2;
          });
        }
      )
    );
  }
}
