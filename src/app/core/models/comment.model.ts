import { firestore } from 'firebase/app';

/**
 * Post comment store in firestore
 */
export interface Comment {
  id: string;
  name: string;
  img: string;
  text: string;
  createdAt: any;
}
