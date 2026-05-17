import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Home/Home.css";
import "./Books.css";
import albaLogo from "../../assets/alba-logo.png";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [returnUsers, setReturnUsers] = useState([]);
  const [selectedReturnUser, setSelectedReturnUser] = useState("");
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [borrowSearch, setBorrowSearch] = useState("");

  const fullName = localStorage.getItem("full_name");
  const role = localStorage.getItem("role");

  const initials = (fullName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    fetch(`http://localhost/library-api/getBook.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (role !== "admin") {
      fetch(`http://localhost/library-api/checkFavorite.php?user_id=${userId}&book_id=${id}`)
        .then((res) => res.json())
        .then((data) => setIsSaved(data.saved));
    }
  }, [id, role]);

  useEffect(() => {
    fetch("http://localhost/library-api/getUsersBorrow.php")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const saveBook = async () => {
    const response = await fetch("http://localhost/library-api/updateBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    if (data.success) {
      setMessage("Book updated successfully");
      setEditing(false);
    } else {
      alert("Update failed");
    }
  };

  const borrowBook = async () => {
    if (selectedUser === "") { alert("Please select a user"); return; }
    const response = await fetch("http://localhost/library-api/borrowBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: selectedUser, book_id: id }),
    });
    const data = await response.json();
    if (data.success) {
      const newTakenCopies = Number(book.taken_copies) + 1;
      setBook({ ...book, taken_copies: newTakenCopies, status: newTakenCopies >= Number(book.total_copies) ? "Taken" : "Available" });
      setShowBorrowModal(false);
      setSelectedUser("");
      setMessage("Book borrowed successfully");
    }
  };

  const returnBook = async () => {
    if (selectedReturnUser === "") { alert("Please select a user"); return; }
    const response = await fetch("http://localhost/library-api/returnBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_id: id, user_id: selectedReturnUser }),
    });
    const data = await response.json();
    if (data.success) {
      const newTakenCopies = Math.max(Number(book.taken_copies) - 1, 0);
      setBook({ ...book, taken_copies: newTakenCopies, status: newTakenCopies >= Number(book.total_copies) ? "Taken" : "Available" });
      setShowReturnModal(false);
      setSelectedReturnUser("");
      setMessage("Book returned successfully");
    }
  };

  const deleteBook = async () => {
    const response = await fetch("http://localhost/library-api/deleteBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_id: id }),
    });
    const data = await response.json();
    if (data.success) {
      setMessage("Book deleted successfully");
      setTimeout(() => { window.location.href = "/books"; }, 1500);
    }
  };

  const saveToMyList = async () => {
    const response = await fetch("http://localhost/library-api/saveFavorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: localStorage.getItem("user_id"), book_id: id }),
    });
    const data = await response.json();
    if (data.success) { setIsSaved(true); setMessage("Book saved to your list"); }
    else { alert("Failed to save book"); }
  };

  const removeFromMyList = async () => {
    const response = await fetch("http://localhost/library-api/removeFavorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: localStorage.getItem("user_id"), book_id: id }),
    });
    const data = await response.json();
    if (data.success) { setIsSaved(false); setMessage("Book removed from your list"); }
    else { alert("Failed to remove book"); }
  };

  const openReturnModal = async () => {
    const response = await fetch(`http://localhost/library-api/getBorrowers.php?book_id=${id}`);
    const data = await response.json();
    setReturnUsers(data);
    setShowReturnModal(true);
  };

  if (!book) return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <p>Loading book details...</p>
    </div>
  );

  const availableCopies = Number(book.total_copies) - Number(book.taken_copies);
  const displayStatus = availableCopies > 0 ? "Available" : "Taken";

  return (
    <div className="page-wrapper">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand">
          <img src={albaLogo} alt="Alba Logo" className="nav-brand-logo" />
          <span className="nav-brand-name">Alba Library</span>
        </div>
        <div className="nav-links">
          <a href="/home" className="nav-link">Home</a>
          <a href="/books" className="nav-link active">Books</a>
          {role !== "admin" && <a href="/my-list" className="nav-link">My List</a>}
          <div className="nav-divider" />
          <a href="/profile" className="profile-chip">
            <div className="profile-avatar">{initials}</div>
            <span className="profile-name">{fullName}</span>
            <span className="role-badge">{role}</span>
          </a>
          <button className="logout-btn" onClick={() => { localStorage.removeItem("user_id"); localStorage.removeItem("role"); window.location.href = "/"; }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="back-btn-wrap">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* ── BOOK DETAILS */}
      <div className="details-outer">
        <div className="book-details">

          {message && <div className="success-message">{message}</div>}

          <div className="book-cover-wrap">
            <img src={book.image_url} alt={book.title} className="book-image" />
          </div>

          {/* Book Info */}
          <div className="book-info">

            {editing ? (
              <div className="edit-fields">
                <input value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} placeholder="Title" />
                <input value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} placeholder="Author" />
                <input value={book.category} onChange={(e) => setBook({ ...book, category: e.target.value })} placeholder="Category" />
                <input value={book.publish_date} onChange={(e) => setBook({ ...book, publish_date: e.target.value })} placeholder="Publish Date" />
                <input value={book.shelf} onChange={(e) => setBook({ ...book, shelf: e.target.value })} placeholder="Shelf" />
                <input value={book.row_number} onChange={(e) => setBook({ ...book, row_number: e.target.value })} placeholder="Row Number" />
                <input value={book.image_url} onChange={(e) => setBook({ ...book, image_url: e.target.value })} placeholder="Image URL" />
                <textarea
                  className="edit-description"
                  value={book.description || ""}
                  onChange={(e) => setBook({ ...book, description: e.target.value })}
                  placeholder="Book Description"
                  rows="5"
                />
              </div>
            ) : (
              <>
                <h1>{book.title}</h1>
                <div className="book-meta-grid">
                  <div className="meta-item"><span className="meta-label">Author</span><span className="meta-value">{book.author}</span></div>
                  <div className="meta-item"><span className="meta-label">Category</span><span className="meta-value">{book.category}</span></div>
                  <div className="meta-item"><span className="meta-label">Published</span><span className="meta-value">{book.publish_date}</span></div>
                  <div className="meta-item"><span className="meta-label">Shelf</span><span className="meta-value">{book.shelf}</span></div>
                  <div className="meta-item"><span className="meta-label">Row</span><span className="meta-value">{book.row_number}</span></div>
                  <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <span className={`status-badge ${displayStatus === "Available" ? "status-available" : "status-taken"}`}>
                      {displayStatus}
                    </span>
                  </div>
                  <div className="meta-item"><span className="meta-label">Copies</span><span className="meta-value">{book.taken_copies} taken out of {book.total_copies}</span></div>
                </div>
              </>
            )}

            {/* Description */}
            {!editing && (
              <div className="book-description">
                <h3>Description</h3>
                <p>{book.description || "No description available."}</p>
              </div>
            )}

            {/* Admin: Edit button */}
            {role === "admin" && (
              <button className="edit-btn" onClick={editing ? saveBook : () => setEditing(true)}>
                {editing ? "Save Changes" : "Edit Book"}
              </button>
            )}

            {/* Action Buttons */}
            <div className="book-actions">
              {role === "admin" ? (
                <>
                  {Number(book.taken_copies) < Number(book.total_copies) && (
                    <button className="borrow-btn" onClick={() => setShowBorrowModal(true)}>Borrow Book</button>
                  )}
                  {Number(book.taken_copies) > 0 && (
                    <button className="return-btn" onClick={openReturnModal}>Return Book</button>
                  )}
                  <button className="delete-details-btn" onClick={() => setShowDeleteConfirm(true)}>Delete Book</button>
                </>
              ) : (
                <>
                  {isSaved ? (
                    <button className="remove-list-btn" onClick={removeFromMyList}>Remove from My List</button>
                  ) : (
                    <button className="save-list-btn" onClick={saveToMyList}>Save to My List</button>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/*  BORROW MODAL */}
      {showBorrowModal && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <div className="modal-icon modal-icon-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3>Borrow Book</h3>
            <p className="modal-sub">Search and select the user to borrow this book</p>

            <div className="modal-search-wrap">
              <svg className="modal-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="modal-search-input"
                type="text"
                placeholder="Search by name or email..."
                value={borrowSearch}
                onChange={(e) => setBorrowSearch(e.target.value)}
              />
            </div>

            <select
              className="borrow-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              size={5}
            >
              <option value="">Select user</option>
              {users
                .filter((u) =>
                  u.full_name.toLowerCase().includes(borrowSearch.toLowerCase()) ||
                  u.email.toLowerCase().includes(borrowSearch.toLowerCase())
                )
                .map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.full_name} — {user.email}
                  </option>
                ))}
            </select>

            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => { setShowBorrowModal(false); setBorrowSearch(""); }}>Cancel</button>
              <button className="confirm-delete-btn" style={{ background: "#1E6FBF" }} onClick={borrowBook}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* ── RETURN MODAL ── */}
      {showReturnModal && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <div className="modal-icon modal-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h3>Return Book</h3>
            <p className="modal-sub">Select the user returning this book</p>
            <select className="borrow-select" value={selectedReturnUser} onChange={(e) => setSelectedReturnUser(e.target.value)}>
              <option value="">Select user</option>
              {returnUsers.map((user, index) => (
                <option key={index} value={user.user_id}>{user.full_name} - {user.email}</option>
              ))}
            </select>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowReturnModal(false)}>Cancel</button>
              <button className="confirm-delete-btn" style={{ background: "#15803D" }} onClick={returnBook}>Confirm Return</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <div className="modal-icon modal-icon-red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </div>
            <h3>Delete Book?</h3>
            <p className="modal-sub">This action cannot be undone. The book will be permanently removed.</p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="confirm-delete-btn" onClick={deleteBook}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BookDetails;
