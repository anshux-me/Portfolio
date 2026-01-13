import "./BookCard.css";
import { Book } from "./data/books";

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} />

      <div className="book-info">
        <h4>{book.title}</h4>
        <p className="author">{book.author}</p>

        <div className="meta">
          <span className={`status ${book.status}`}>
            {book.status}
          </span>

          {book.rating !== null && (
            <span className="rating">{book.rating}/5</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard; 
