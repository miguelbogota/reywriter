/**
 * Main text in the home page.
 */
export interface Settings {
  title: string;
  about: string;
  coverUrl?: string;
  photoUrl: string;
  quote?: {
    text: string;
    author: string;
  };
}
