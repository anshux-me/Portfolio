// ================================
// Library Section (Single File)
// ================================

import "./Library.css";
import booksData from "./data/books.json";

type Book = {
  id: string;
  cover: string;
  status: "reading" | "read";
};

const Library = () => {
  const { books, totalRead } = booksData;

  const readingBooks = books.filter(b => b.status === "reading");
  const readBooks = books.filter(b => b.status === "read");

  return (
    <section id="library" className="library-section">
      {/* ===== Section Header ===== */}
      
      <p className="library-subtitle">Books that I’ve read or am reading</p>
      <p className="library-total">Total read: {totalRead}</p>

      {/* ===== Currently Reading Section ===== */}
      <div className="library-block">
        <h3 className="library-block-title">Currently Reading</h3>
        <div className="library-row">
          {readingBooks.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.cover} alt="Book cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Read Section ===== */}
      <div className="library-block">
        <h3 className="library-block-title">Read</h3>
        <div className="library-row">
          {readBooks.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.cover} alt="Book cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Recommend a Book (UI only) ===== */}
      <div className="library-recommend">
        <input
          type="text"
          placeholder="Recommend me a book or article…"
        />
        <button aria-label="Send recommendation">➜</button>
      </div>
    </section>
  );
};

export default Library;
