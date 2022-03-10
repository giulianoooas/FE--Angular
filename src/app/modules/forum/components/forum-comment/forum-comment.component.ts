import { Component, Input, OnInit } from '@angular/core';
import { ForumComment } from 'src/app/models/forum-comment.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.scss']
})
export class ForumCommentComponent implements OnInit {

  @Input() public comments: ForumComment[] = [];
  public userNames= new Map<number, string>();
  private existsUsers = new Map<number, boolean>();

  public constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.setUsers();
  }

  private setUsers(): void{
    this.existsUsers.set(-1,true);
    for (const comment of this.comments){
      if (comment.userId && !this.existsUsers.get(comment.userId)){
        this.existsUsers.set(comment.userId,true);
      }
    }
    const userIds = [];

  }
}
