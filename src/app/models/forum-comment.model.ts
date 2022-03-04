export interface ForumComment{
  forumCommentId?: number;
  text: string;
  date: string;
  userId?: number;
  forumTextId: number;
}

export interface ForumCommentEdit{
  forumCommentId?: number;
  text: string;
  date: Date;
  userId?: number;
  forumTextId: number;
}
