import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-predict',
  templateUrl: './price-predict.component.html',
  styleUrls: ['./price-predict.component.scss']
})
export class PricePredictComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public title = 'Predict you book price';
  public price = 0;
  public file = '';
  public formGroup=new  FormGroup({
    file: new FormControl()
  });

  public constructor() { }

  public ngOnInit(): void {
    this.setSubscription();
  }

  private setSubscription(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        // aici voi face request pentru predictia de pret
        this.file = data.file.toString();
      })
    );
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }


  public clearFileSelector(): void{
    this.file = '';
    this.formGroup.controls['file'].setValue('');
  }
}
