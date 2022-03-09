import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { CreateForumTextComponent } from './components/create-forum-text/create-forum-text.component';
import { CreateForumCommentComponent } from './components/create-forum-comment/create-forum-comment.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ForumTextComponent } from './components/forum-text/forum-text.component';



@NgModule({
  declarations: [
    ForumComponent,
    CreateForumTextComponent,
    CreateForumCommentComponent,
    ForumTextComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class ForumModule { }
