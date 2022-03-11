import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ForumComment } from 'src/app/models/forum-comment.model';
import { ForumService } from 'src/app/services/forum.service';
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
  public userNames= new Map<number, string>();
  public showingData: any[] = [];
  public showData = false;
  private existsUsers = new Map<number, boolean>();
  private subscription = new Subscription();
  @Output() deleteCommentEvent = new EventEmitter<number>();

  public constructor(private readonly userService: UserService,
      private readonly forumService: ForumService
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
    }
    this.showData = true;
  }

  private subscribeToAddData(): void{
    this.subscription.add(
      this.forumService.getData().subscribe(
        (data) => {
          const jsonData = JSON.parse(data);
          const index = jsonData.index;
          if (index){
            this.showingData[index].push(jsonData);
          }
          else {
            this.showingData.push(jsonData);
          }
        }
      )
    );
  }

  public deleteComment(index: number): void{
    const comment = this.showingData[index];
    this.deleteCommentEvent.emit(comment.commentId);
    const newComments = [];
    for (let i = 0; i <  this.showingData.length; i ++){
      if (i == index){
        continue;
      }
      newComments.push(this.showingData[i]);
    }
    this.showingData = newComments;
  }
}
