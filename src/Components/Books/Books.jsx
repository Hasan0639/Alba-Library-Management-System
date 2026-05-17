import "../Home/Home.css";
import "./Books.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import albaLogo from "../../assets/alba-logo.png";

function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("full_name");

  const initials = (fullName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    fetch("http://localhost/library-api/getBooks.php")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) => {
    return (
      (category === "All" || book.category === category) &&
      book.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="page-wrapper">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <img src={albaLogo} alt="Alba Logo" className="nav-brand-logo" />
          <span className="nav-brand-name">Alba Library</span>
        </div>
        <div className="nav-links">
          <a href="/home" className="nav-link">Home</a>
          <a href="/books" className="nav-link active">Books</a>
          {role !== "admin" && (
            <a href="/my-list" className="nav-link">My List</a>
          )}
          <div className="nav-divider" />
          <a href="/profile" className="profile-chip">
            <div className="profile-avatar">{initials}</div>
            <span className="profile-name">{fullName}</span>
            <span className="role-badge">{role}</span>
          </a>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user_id");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>Books</h1>
          <p>Browse and discover books available in the Alba Library</p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="books-container">

        {/* Search + Manage */}
        <div className="books-top-section">
          <div className="search-row">
            <div className="search-input-wrap">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="search-bar"
                type="text"
                placeholder="Search for a book..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {role === "admin" && (
              <button
                className="manage-books-btn"
                onClick={() => navigate("/manage-books")}
              >
                Manage Books
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="categories">
            {["All", "IT", "Business", "Safety", "Engineering"].map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="book-list">
          {filteredBooks.map((book) => (
            <div
              className="book-card"
              key={book.book_id}
              onClick={() => navigate(`/book/${book.book_id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="book-card-img-wrap">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="book-card-image"
                />
              </div>
              <div className="book-card-body">
                <h3>{book.title}</h3>
                <div className="book-card-badges">
                  <span className="book-cat-badge">{book.category}</span>
                  {(() => {
                    const available = Number(book.total_copies) - Number(book.taken_copies);
                    const s = available > 0 ? "Available" : "Taken";
                    return (
                      <span className={`status-badge ${s === "Available" ? "status-available" : "status-taken"}`}>
                        {s}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Books;
