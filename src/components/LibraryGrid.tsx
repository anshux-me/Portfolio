// import "./LibraryGrid.css";
// import booksData from "./data/books.json";
// import { BooksJson } from "./data/books";
// import BookCard from "./BookCard";

// const LibraryGrid = () => {
//   const { books, totalRead } = booksData as BooksJson;

//   return (
//     <>
//       <p className="library-count">Total read: {totalRead}</p>

//       <div className="library-grid">
//         {books.map((book) => (
//           <BookCard key={book.id} book={book} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default LibraryGrid;

import "./LibraryGrid.css";
import booksData from "./data/books.json";
import BookCard from "./BookCard";
import { BooksJson } from "./data/books";

const LibraryGrid = () => {
  const { books, totalRead } = booksData as BooksJson;

  return (
    <section className="library-wrapper">
      <h2 className="library-heading">
        Books that I’ve read or am reading
      </h2>

      <p className="library-subtitle">
        Total read: {totalRead}
      </p>

      <div className="library-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default LibraryGrid;
