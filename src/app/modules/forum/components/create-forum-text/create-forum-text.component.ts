import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-create-forum-text',
  templateUrl: './create-forum-text.component.html',
  styleUrls: ['./create-forum-text.component.scss']
})
export class CreateForumTextComponent implements OnInit, OnDestroy {

  public formGroup = new FormGroup({
    text: new FormControl('')
  })
  public user: User | null;
  public valid = true;
  private subscription = new Subscription();
  private text = '';
  @Output() public createForumTextEvent = new EventEmitter<string>();

  public ngOnInit(): void {
    this.subscribeFormGroup();
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  private subscribeFormGroup(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe(
        (data) => {
          this.text = data.text;
          this.valid = true;
        }
      )
    );
  }

  public clearText(): void{
    this.formGroup.controls['text'].setValue('');
  }

  public createForum(): void{
    if (this.text){
      this.createForumTextEvent.emit(this.text);
      this.clearText();
      return;
    }
    this.valid = false;
  }

}
