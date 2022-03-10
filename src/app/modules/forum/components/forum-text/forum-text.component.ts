import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ForumText } from 'src/app/models/forum-text.model';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-text',
  templateUrl: './forum-text.component.html',
  styleUrls: ['./forum-text.component.scss']
})
export class ForumTextComponent implements OnInit {
  @Input() public userId: number;
  @Input() public isAdmin: boolean;
  @Input() public forumText: ForumText;
  @Input() public index: number;
  public canDelete = false;
  public imageSrc= './assets/images/user-icon.png';
  public name = 'Anonymous user';
  @Output() deleteForumTextEvent = new EventEmitter<number>();

  public constructor(
    private readonly forumService: ForumService,
    private readonly userService: UserService
  ) { }

  public ngOnInit(): void {
    this.setData();
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
  }

  public deleteForumText():void{
    this.deleteForumTextEvent.emit(this.index);
  }
}
