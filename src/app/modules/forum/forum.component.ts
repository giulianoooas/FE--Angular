import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public userId: number;

  constructor(
    private readonly authService: AuthService,
    private readonly forumService: ForumService
  ) { }

  public ngOnInit(): void {
    this.setUserId();
  }

  private setUserId(): void{
    this.userId = this.authService.getUserId();
  }

  public createForumComment(forumText: string): void{
    this.forumService.createForumText({
      text: forumText,
      userId: this.userId,
      date: new Date(),
    }).subscribe();
  }
}
