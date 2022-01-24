import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CommentComponent } from './book-details/components/comment/comment.component';
import { CommentsListComponent } from './book-details/components/comments-list/comments-list.component';
import { CommentCreateComponent } from './book-details/components/comment-create/comment-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BookCategoryNameComponent } from './book-details/components/book-category-name/book-category-name.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { BookLinkComponent } from './book-details/components/book-link/book-link.component';


@NgModule({
  declarations: [
    BookComponent,
    BookListComponent,
    BookDetailsComponent,
    CommentComponent,
    CommentsListComponent,
    CommentCreateComponent,
    BookCategoryNameComponent,
    BookCreateComponent,
    BookFilterComponent,
    BookLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule
    ],
  exports: [BookComponent]
})
export class BookModule { }
