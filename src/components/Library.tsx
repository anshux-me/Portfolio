// ================================
// Library Section
// ================================

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Library.css";
import booksData from "./data/books.json";

type Book = {
  id: string;
  cover: string;
  link: string;
  status: "reading" | "read" | "paused";
};

const statusLabel: Record<string, string> = {
  reading: "Reading",
  read: "Read",
  paused: "Paused",
};

const Library = () => {
  const { books, totalRead } = booksData;

  // Recommendation form state
  const recommendFormRef = useRef<HTMLFormElement | null>(null);
  const [sendingRecommendation, setSendingRecommendation] = useState(false);
  const [recommendResult, setRecommendResult] = useState<string | null>(null);

  const handleRecommendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recommendFormRef.current) return;

    setSendingRecommendation(true);
    setRecommendResult(null);

    try {
      await emailjs.sendForm(
        "service_lf1wyti",
        "template_wspwju1",
        recommendFormRef.current,
        "RxnQkd68McQZKFvcd"
      );

      setRecommendResult("Thank you for the recommendation!");
      recommendFormRef.current.reset();
    } catch (err) {
      console.error("Recommendation send error", err);
      setRecommendResult("Failed to send. Please try again.");
    } finally {
      setSendingRecommendation(false);
    }
  };

  // Scroll ref for the single merged row
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section id="library" className="library-section">
      {/* ===== Section Header ===== */}
      <p className="library-subtitle">Books that I've read or am reading</p>
      <p className="library-total">Total read: {totalRead}</p>

      {/* ===== Single Library Block ===== */}
      <div className="library-blocks-grid">
        <div className="library-block">
          <h3 className="library-block-title">Library</h3>

          <div className="scroll-row-layout">
            {/* Left Arrow — outside scroll area */}
            <button
              className="scroll-arrow"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>

            {/* Scrollable Book Row */}
            <div className="library-row" ref={scrollContainerRef}>
              {(books as Book[]).map((book) => (
                <div key={book.id} className="book-item">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-card"
                  >
                    <img src={book.cover} alt={book.id} />
                  </a>
                  <span className={`book-status-bubble status-${book.status}`}>
                    {statusLabel[book.status] ?? book.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Arrow — outside scroll area */}
            <button
              className="scroll-arrow"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* ===== Recommend a Book (EmailJS) ===== */}
      <form
        ref={recommendFormRef}
        className="library-recommend"
        onSubmit={handleRecommendSubmit}
      >
        <input
          type="text"
          name="message"
          placeholder="Recommend me a book or article…"
          required
          disabled={sendingRecommendation}
        />

        <input
          type="hidden"
          name="time"
          value={new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />

        <button
          type="submit"
          aria-label="Send recommendation"
          disabled={sendingRecommendation}
        >
          {sendingRecommendation ? "..." : "➜"}
        </button>

        {recommendResult && (
          <p
            className="recommend-result"
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: recommendResult.startsWith("Failed")
                ? "#f87171"
                : "#86efac",
            }}
          >
            {recommendResult}
          </p>
        )}
      </form>
    </section>
  );
};

export default Library;
