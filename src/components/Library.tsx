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
  status: "reading" | "read";
};

const Library = () => {
  const { books, totalRead } = booksData;

  const readingBooks = books.filter((b) => b.status === "reading");
  const readBooks = books.filter((b) => b.status === "read");

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
        "service_lf1wyti", // service ID
        "template_wspwju1", // recommendation template
        recommendFormRef.current,
        "RxnQkd68McQZKFvcd" // public key
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

  // Scroll functionality for Read books section
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="library" className="library-section">
      {/* ===== Section Header ===== */}
      <p className="library-subtitle">Books that I've read or reading</p>
      <p className="library-total">Total read: {totalRead}</p>

      {/* ===== Blocks Grid (mirrors projects-grid) ===== */}
      <div className="library-blocks-grid">

        {/* ===== Currently Reading ===== */}
        <div className="library-block">
          <h3 className="library-block-title">Currently Reading</h3>
          <div className="library-row">
            {readingBooks.map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.cover} alt="Book cover" />
              </div>
            ))}
          </div>
        </div>

        {/* ===== Read ===== */}
        <div className="library-block">
          <h3 className="library-block-title">Read</h3>
          <div className="scroll-wrapper">
            {/* Left Arrow */}
            <button
              className="scroll-arrow scroll-arrow-left"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>

            {/* Scrollable Book Row */}
            <div className="library-row" ref={scrollContainerRef}>
              {readBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <img src={book.cover} alt="Book cover" />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className="scroll-arrow scroll-arrow-right"
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
        {/* ✅ FIX 1: name must be "message" */}
        <input
          type="text"
          name="message"
          placeholder="Recommend me a book or article…"
          required
          disabled={sendingRecommendation}
        />

        {/* ✅ FIX 2: send time explicitly */}
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
