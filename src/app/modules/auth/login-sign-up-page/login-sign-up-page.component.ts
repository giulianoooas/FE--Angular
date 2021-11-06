import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-sign-up-page',
  templateUrl: './login-sign-up-page.component.html',
  styleUrls: ['./login-sign-up-page.component.scss']
})
export class LoginSignUpPageComponent implements OnInit, OnDestroy {
  public errorMessages: string[] = [];
  public formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  public buttonText: string;
  private action: string;
  private subscription: Subscription = new Subscription();
  public email = '';
  public password = '';

  public constructor(private router: Router
    , private authService: AuthService
    , private userService: UserService) { }

  public ngOnInit(): void {
    if (this.router.url.includes('login')){
      this.buttonText = 'Login'
      this.action = 'login';
    } else {
      this.buttonText = 'Sing up';
      this.action = 'singUp';
    }
    this.setSubscribeFormGroup();
  }

  private setSubscribeFormGroup(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        if (data.email){
          this.email = data.email;
        }
        if (data.password){
          this.password = data.password;
        }
      })
    );
  }

  private validatePassword(): boolean{
    console.log(this.password);
    if (this.password.length < 8){
      this.errorMessages.push('Password must have more than 8 letters.');
    }
    let ok = false;
    for (const chr of ['.',',','1','2','3','4','5','6','7','8','9','0','/','@','!','*']){
      if (this.password.includes(chr)){
        ok = true;
        break;
      }
    }
    if (!ok){
      this.errorMessages.push('Password must have a special character.');
    }
    return this.errorMessages.length == 0;
  }

  private validateEmail(): boolean{
    const re = /([a-z]+(.|-|_)?[a-z]*)+@[a-z]+\.[a-z]*/;
    if (!re.test(this.email)){
      this.errorMessages.push('Is not a valid email.');
      return false;
    }
    return true;
  }

  public actionOnForm(): void{
    this.errorMessages = [];
    const validation1 = this.validateEmail();
    const validation2 = this.validatePassword();
    if (this.action !== 'login'){
    if (validation1 && validation2){
      this.userService.createUser({password: this.password, email: this.email}).subscribe(user => {
        this.authService.setUser(user);
        this.router.navigateByUrl('cars')
      })
      }
      if (this.action == 'login'){
        this.userService.login({email:this.email,password: this.password}).subscribe(user => {
          this.authService.setUser(user);
          this.router.navigateByUrl('cars')
        })
      }
    }
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
