import { ForumComment } from "./forum-comment.model";

export interface ForumText{
  forumTextId?: number;
  text: string;
  date: Date;
  userId?: number;
  forumComments: ForumComment[];
}
