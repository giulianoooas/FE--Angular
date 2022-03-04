import { ForumComment, ForumCommentEdit } from "./forum-comment.model";

export interface ForumText{
  forumTextId?: number;
  text: string;
  date: string;
  userId?: number;
  forumComments: ForumComment[];
}

export interface ForumTextEdit{
  forumTextId?: number;
  text: string;
  date: Date;
  userId?: number;
  forumComments: ForumCommentEdit[];
}
