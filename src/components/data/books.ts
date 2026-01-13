export type BookStatus = "reading" | "read" | "paused" | "dropped";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: BookStatus;
  rating: number | null;
}

export interface BooksJson {
  totalRead: number;
  books: Book[];
}