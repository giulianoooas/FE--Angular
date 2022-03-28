import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ForumComment } from 'src/app/models/forum-comment.model';
import { ForumService } from 'src/app/services/forum.service';
import { TextValidatorAPI } from 'src/app/services/text-validator.api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.scss']
})
export class ForumCommentComponent implements OnInit, OnDestroy {

  @Input() public comments: ForumComment[] = [];
  @Input() public userId: number;
  @Input() public isMainAdmin = false;
  public isEditMode: boolean[] = [];
  public formGroups:FormGroup[] = [];
  public userNames= new Map<number, string>();
  public showingData: any[] = [];
  public showData = false;
  private existsUsers = new Map<number, boolean>();
  private subscription = new Subscription();
  @Output() deleteCommentEvent = new EventEmitter<number>();
  @Output() saveCommentEvent = new EventEmitter<{id: number, text: string, index: number}>();

  public constructor(private readonly userService: UserService,
      private readonly forumService: ForumService,
      private readonly textValidationService: TextValidatorAPI
    ) {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.setUsers();
    this.subscribeToAddData();
  }

  private setUsers(): void{
    this.existsUsers.set(-1,true);
    const userIds = [-1];
    for (const comment of this.comments){
      if (comment.userId && !this.existsUsers.get(comment.userId)){
        this.existsUsers.set(comment.userId,true);
        userIds.push(+comment.userId);
      }
    }
    this.setUsersNames(userIds);
  }

  private setUsersNames(userIds: number[]): void{
    this.userNames.set(-1,'Anonymous');
    this.userService.getUsersInfo(userIds).subscribe((users) => {
      for (const user of users){
        this.userNames.set(user.userId, user.name);
      }
      this.generateDataForShowing();
    })
  }

  private generateDataForShowing(): void{
    for (const comment of this.comments){
      this.showingData.push({
        commentId: comment.forumCommentId,
        name: this.userNames.get(comment.userId ?? -1) ?? 'Anonymous',
        text: comment.text,
        date: comment.date,
        userId: comment.userId
      });
      const formGroup = new FormGroup({
        'text': new FormControl(comment.text)
      });
      this.formGroups.push(formGroup);
      this.isEditMode.push(false);
    }
    this.showData = true;
  }

  private subscribeToAddData(): void{
    this.subscription.add(
      this.forumService.getData().subscribe(
        (data) => {
          const jsonData = JSON.parse(data);
          const index = jsonData.index;
          if (index || index === 0){
            this.showingData[index] = jsonData;
            this.isEditMode[index]=false;
            this.formGroups[index].controls['text'].setValue(jsonData.text);
          }
          else {
            this.showingData.push(jsonData);
            this.isEditMode.push(false);
            this.formGroups.push(new FormGroup({'text': new FormControl(jsonData.text)}));
          }
        }
      )
    );
  }

  public makeEditMode(index: number): void{
    this.isEditMode[index] = true;
    this.formGroups[index].controls['text'].setValue(this.showingData[index].text);
  }

  public makeUnEditMode(index: number): void{
    this.isEditMode[index] = false;
  }

  public save(index: number): void{
    const value = this.formGroups[index].controls['text'].value;
    if (value){
      this.textValidationService.getTextStatus(value).subscribe((status) =>{
        if (status == '1'){
          this.showingData[index].text = value;
          this.saveCommentEvent.emit({
            id: this.showingData[index].commentId,
            text: value,
            index: index
          });
        }
      });
    }
    this.makeUnEditMode(index);
  }

  public deleteComment(index: number): void{
    const comment = this.showingData[index];
    const newFormGroups = [];
    const newEditMode = [];
    this.deleteCommentEvent.emit(comment.commentId);
    const newComments = [];
    for (let i = 0; i <  this.showingData.length; i ++){
      if (i == index){
        continue;
      }
      newComments.push(this.showingData[i]);
      newFormGroups.push(this.formGroups[i]);
      newEditMode.push(this.isEditMode[i]);
    }
    this.showingData = newComments;
    this.formGroups = newFormGroups;
    this.isEditMode = newEditMode;
  }
}
