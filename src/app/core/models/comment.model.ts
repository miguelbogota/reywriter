import { firestore } from 'firebase/app';

/**
 * Post comment store in firestore
 */
export interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: firestore.FieldPath;
}
