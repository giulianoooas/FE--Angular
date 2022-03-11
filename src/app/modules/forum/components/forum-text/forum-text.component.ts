import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ForumComment, ForumCommentEdit } from 'src/app/models/forum-comment.model';
import { ForumText } from 'src/app/models/forum-text.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-text',
  templateUrl: './forum-text.component.html',
  styleUrls: ['./forum-text.component.scss']
})
export class ForumTextComponent implements OnInit, OnDestroy {
  @Input() public userId: number;
  @Input() public isAdmin: boolean;
  @Input() public forumText: ForumText;
  @Input() public index: number;
  public comments: ForumComment[] | undefined = undefined;
  public showingComments: ForumComment[] = [];
  public canDelete = false;
  public imageSrc= './assets/images/user-icon.png';
  public name = 'Anonymous user';
  public isEdit = false;
  public formGroup= new FormGroup({
    text: new FormControl('')
  });
  public showComments = false;
  public showCommentCreate = false;
  @Output() public deleteForumTextEvent = new EventEmitter<number>();
  @Output() public editForumTextEvent = new EventEmitter<{index: number, text: ForumText}>();
  private editedText: string;
  private subscription = new Subscription();

  public constructor(
    private readonly forumService: ForumService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.setData();
    this.subscribeToFormGroup();
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  private subscribeToFormGroup(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        this.editedText = data.text;
      })
    );
  }

  private setData(): void{
    this.userService.getUserInfo(this.forumText.userId ?? -1).subscribe(
      (res) => {
        if (res){
          if (res.imageSrc){
            this.imageSrc = res.imageSrc;
          }
          this.name = res.name;
        }
      }
    )
    this.canDelete = this.isAdmin || this.userId == this.forumText.userId;
    this.editedText = this.forumText.text;
    this.formGroup.controls['text'].setValue(this.editedText);
  }

  public deleteForumText():void{
    this.deleteForumTextEvent.emit(this.index);
  }

  public setEditMode(): void{
    this.editedText = this.forumText.text;
    this.formGroup.controls['text'].setValue(this.editedText);
    this.isEdit = true;
  }

  public setViewMode(): void{
    this.isEdit = false;
  }

  public save(): void{
    if (this.editedText !== ''){
      const forumText = {...this.forumText};
      forumText.text = this.editedText;
       this.editForumTextEvent.emit({index: this.index, text: forumText});
      }
    this.setViewMode();
  }

  public setShowComments(value: boolean): void{
    if (value  && !this.comments){
      this.forumService.getAllForumTextComments(this.forumText.forumTextId ?? -1).subscribe(
        (comments) => {
          this.comments = comments;
          this.showingComments = comments;
          this.showComments = value;
        }
      );
      return;
    }
    if (value){
      this.showingComments = this.comments ?? [];
    } else {
      this.showingComments = [];
    }
    this.showComments = value;
  }

  public openCreateComment(): void{
    this.showCommentCreate = true;
  }

  public closeCreateComment(): void{
    this.showCommentCreate = false;
  }

  public createComment(text: string): void{
    const comment: ForumCommentEdit = {
      forumTextId: this.forumText.forumTextId ?? -1,
      userId: this.userId,
      text: text,
      date: new Date()
    };
    this.forumService.createForumComment(comment).subscribe((data) => {
      if (this.comments){
        this.comments.push(data);
      }
      this.showingComments.push(data);
      this.forumService.sendData({
        text,
        name: this.authService.getNickname(),
        date: data.date,
        userId: this.userId
      })
      this.showComments = true;
    });
  }
}
