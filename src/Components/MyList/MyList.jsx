import "../Home/Home.css";
import "./MyList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import albaLogo from "../../assets/alba-logo.png";

function MyList() {
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
    const userId = localStorage.getItem("user_id");
    fetch(`http://localhost/library-api/getFavorites.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

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
          <a href="/books" className="nav-link">Books</a>
          {role !== "admin" && (
            <a href="/my-list" className="nav-link active">My List</a>
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

      {/* PAGE HEADER  */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>My Saved Books</h1>
          <p>Books you've saved for later reference</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mylist-container">

        {books.length === 0 ? (
          <div className="mylist-empty">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3>No saved books yet</h3>
            <p>Browse the library and save books to your list</p>
            <a href="/books" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", marginTop: "16px" }}>
              Browse Books
            </a>
          </div>
        ) : (
          <div className="mylist-books">
            {books.map((book) => (
              <div
                className="mylist-card"
                key={book.book_id}
                onClick={() => navigate(`/book/${book.book_id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="mylist-img-wrap">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="book-card-image"
                  />
                </div>
                <div className="mylist-card-body">
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
        )}

      </div>
    </div>
  );
}

export default MyList;
