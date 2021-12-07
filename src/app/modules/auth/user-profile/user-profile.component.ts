import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public formGroup = new FormGroup({
    newPassword: new FormControl(''),
    userId: new FormControl(''),
    nickname: new FormControl(''),
    userStatus: new FormControl(''),
    password: new FormControl(''),
    logoUrl: new FormControl(''),
    email: new FormControl('')
  });
  public password = '';
  public errorMessages: string[] = [];
  public editElement= '';
  public user: User;
  public changedUser: User;
  public logoUrl = './assets/images/user-icon.png';
  public subscription: Subscription = new Subscription();

  public constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.setUser();
    this.subscribeFormGroup();
  }

  private setUser(): void{
    this.user = this.authService.getUser();
    if (this.user.logoUrl && this.user.logoUrl.length != 0){
      this.logoUrl = this.user.logoUrl;
    }
    this.setEditElement('');
  }

  private setFormGroup(): void{
    this.formGroup.controls['userId'].setValue(this.user.userId);
    this.formGroup.controls['userStatus'].setValue(this.user.userStatus);
    this.formGroup.controls['password'].setValue('');
    this.formGroup.controls['newPassword'].setValue('');
    this.formGroup.controls['email'].setValue(this.user.email);
    this.formGroup.controls['logoUrl'].setValue(this.user.logoUrl ?? '');
    this.formGroup.controls['nickname'].setValue(this.user.nickname);
  }

  private subscribeFormGroup(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((user) => {
        this.password = user.password;
        switch(this.editElement){
          case 'password':
            this.changedUser.password = user.newPassword;
            break;
          case 'logoUrl':
            this.changedUser.logoUrl = user.logoUrl;
            break;
          case 'nickname':
            this.changedUser.nickname = user.nickname;
            break;
          case 'email':
            this.changedUser.email = user.email;
            break;
        }
        console.log(this.changedUser, this.editElement);
      })
    );
  }

  public setEditElement(element: string): void{
    this.editElement = element;
    this.changedUser = this.authService.getUser();
    this.setFormGroup();
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  private validateNickname(): void{
    if (this.changedUser.nickname === ''){
      this.errorMessages.push('Nickname must be not null.');
    }
  }

  private validatePassword(): void{
    if (this.changedUser.password.length < 8){
      this.errorMessages.push('Password must have more than 8 letters.');
    }
    let ok = false;
    for (const chr of ['.',',','1','2','3','4','5','6','7','8','9','0','/','@','!','*']){
      if (this.changedUser.password.includes(chr)){
        ok = true;
        break;
      }
    }
    if (!ok){
      this.errorMessages.push('Password must have a special character.');
    }
  }

  private validateEmail(): void{
    const re = /([a-z]+(.|-|_)?[a-z]*)+@[a-z]+\.[a-z]*/;
    if (!re.test(this.changedUser.email)){
      this.errorMessages.push('Is not a valid email.');
    }
  }

  private validateUpdate(): boolean{
    if (this.user.password !== this.password){
      this.errorMessages.push('Passwords are not the same!');
    }
    this.validateEmail();
    this.validateNickname();
    this.validatePassword();
    return this.errorMessages.length === 0;
  }

  public updateUser(): void{
    if (this.validateUpdate()){
      this.userService.updateUser(this.changedUser).subscribe(
        (user) => {
          this.authService.setUser(user);
          this.setUser();
        }
      )
    }
  }
}
