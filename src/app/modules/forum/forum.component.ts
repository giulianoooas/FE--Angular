import { Component, OnInit } from '@angular/core';
import { ForumText, ForumTextEdit } from 'src/app/models/forum-text.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public userId: number;
  public isAdmin = false;
  public forumTexts: ForumText[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly forumService: ForumService
  ) { }

  public ngOnInit(): void {
    this.setUserId();
    this.setFormTexts();
  }

  private setFormTexts(): void{
    this.forumService.getAllForumTexts().subscribe(
      (res) =>{
        this.forumTexts = res;
      }
    );
  }

  private setUserId(): void{
    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.getIsAdmin();
  }

  public createForumComment(forumText: string): void{
    this.forumService.createForumText({
      text: forumText,
      userId: this.userId,
      date: new Date(),
    }).subscribe((res) => {
      this.forumTexts.push(res);
    });
  }

  public deleteForumText(index: number): void{
    const forumTextId = this.forumTexts[index].forumTextId ?? -1;
    this.forumService.deleteForumText(forumTextId).subscribe(
      () => {
        const newForumTexts = [];
        for (let i = 0; i < this.forumTexts.length; i ++){
          if (i != index){
            newForumTexts.push(this.forumTexts[i]);
          }
        }
        this.forumTexts = newForumTexts;
      }
    );
  }

  public editForumText(params: {index: number, text: ForumText}): void{
    console.log(params);

    const {index, text} = params;
    const editedForumText: ForumTextEdit = {
      forumTextId: text.forumTextId,
      date: new Date(),
      text: text.text,
      userId: this.userId
    }
    this.forumService.editForumText(editedForumText).subscribe(
      (data) => {
        this.forumTexts[index] = data;
      }
    );
  }
}
