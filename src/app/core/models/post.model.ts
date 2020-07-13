/**
 * Post model from firestore
 */
export interface Post {
  id: string;
  title: string;
  imageUrl?: string;
  text: string[]; // Max 500.000
  tags?: string[];
  createdAt: any;
  likes: any[]; // Id of the people who liked the post
  likeCount: any;
  readCount: any;
  commentCount: any;
}
