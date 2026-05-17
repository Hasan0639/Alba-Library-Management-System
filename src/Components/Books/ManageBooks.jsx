import "../Home/Home.css";
import "./Books.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import albaLogo from "../../assets/alba-logo.png";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [borrowers, setBorrowers] = useState([]);
  const [showBorrowersModal, setShowBorrowersModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [shelf, setShelf] = useState("");
  const [rowNumber, setRowNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Available");
  const [totalCopies, setTotalCopies] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("full_name");
  const [description, setDescription] = useState("");

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

  const addBook = async () => {
    const response = await fetch("http://localhost/library-api/addBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title, category_id: category, author,
        publish_date: publishDate, shelf, row_number: rowNumber,
        image_url: imageUrl, status, total_copies: totalCopies, description,
      }),
    });
    const data = await response.json();
    if (data.success) { alert("Book added"); window.location.reload(); }
    else { alert("Failed to add book"); }
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || book.status === statusFilter)
    );
  });

  const totalBooks = books.length;
  const availableBooks = books.filter((book) => book.status === "Available").length;
  const borrowedBooks = books.filter((book) => book.status === "Taken").length;

  const viewBorrowers = async (bookId) => {
    const response = await fetch(`http://localhost/library-api/getBorrowers.php?book_id=${bookId}`);
    const data = await response.json();
    setBorrowers(data);
    setShowBorrowersModal(true);
  };

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

      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>Manage Books</h1>
          <p>Add, monitor, and manage the full library catalog</p>
        </div>
      </div>

      <div className="books-container">

        {/* ── DASHBOARD STAT CARDS ── */}
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={() => setStatusFilter("All")}>
            <div className="dash-card-icon dash-icon-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div className="dash-card-info">
              <h3>Total Books</h3>
              <p>{totalBooks}</p>
            </div>
          </div>

          <div className="dashboard-card" onClick={() => setStatusFilter("Available")}>
            <div className="dash-card-icon dash-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <div className="dash-card-info">
              <h3>Available</h3>
              <p className="dash-green">{availableBooks}</p>
            </div>
          </div>

          <div className="dashboard-card" onClick={() => setStatusFilter("Taken")}>
            <div className="dash-card-icon dash-icon-red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
            </div>
            <div className="dash-card-info">
              <h3>Borrowed</h3>
              <p className="dash-red">{borrowedBooks}</p>
            </div>
          </div>
        </div>

        {/* ── TOP BAR ── */}
        <div className="manage-top-bar">
          <div className="search-input-wrap">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="search-bar"
              type="text"
              placeholder="Search for a book..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="plus-btn" onClick={() => setShowForm(true)}>
            + Add Book
          </button>
        </div>

        {/* ── TABLE TITLE ── */}
        <div className="table-header-row">
          <h2 className="section-title">
            {statusFilter === "All" ? "All Books" : `${statusFilter} Books`}
          </h2>
          <span className="table-count">{filteredBooks.length} books</span>
        </div>

        {/* ── TABLE ── */}
        <div className="table-wrap">
          <table className="manage-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Shelf</th>
                <th>Row</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.book_id}>
                  <td>
                    <img src={book.image_url} alt={book.title} className="table-book-img" />
                  </td>
                  <td className="table-title">{book.title}</td>
                  <td>
                    <span className="table-cat-badge">{book.category}</span>
                  </td>
                  <td>
                    {(() => {
                      const available = Number(book.total_copies) - Number(book.taken_copies);
                      const s = available > 0 ? "Available" : "Taken";
                      return (
                        <span className={`table-status-badge ${s === "Available" ? "status-available" : "status-taken"}`}>
                          {s}
                        </span>
                      );
                    })()}
                  </td>
                  <td>{book.shelf}</td>
                  <td>{book.row_number}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" onClick={() => navigate(`/book/${book.book_id}`)}>View</button>
                      <button className="borrowers-btn" onClick={() => viewBorrowers(book.book_id)}>Borrowers</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ── ADD BOOK MODAL ── */}
      {showForm && (
        <div className="modal-overlay">
          <div className="add-book-modal">
            <h2>Add New Book</h2>

            <input placeholder="Book title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="1">IT</option>
              <option value="2">Business</option>
              <option value="3">Safety</option>
              <option value="4">Engineering</option>
            </select>
            <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input placeholder="Publish Date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
            <input placeholder="Shelf" value={shelf} onChange={(e) => setShelf(e.target.value)} />
            <input placeholder="Row Number" value={rowNumber} onChange={(e) => setRowNumber(e.target.value)} />
            <input type="number" min="1" placeholder="Total Copies" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} />
            <textarea
              className="book-description-input"
              placeholder="Book Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
            <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Available">Available</option>
              <option value="Taken">Taken</option>
            </select>

            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="confirm-delete-btn" style={{ background: "#1E6FBF" }} onClick={addBook}>Add Book</button>
            </div>
          </div>
        </div>
      )}

      {/* ── BORROWERS MODAL ── */}
      {showBorrowersModal && (
        <div className="modal-overlay">
          <div className="confirm-box borrowers-modal">
            <div className="modal-icon modal-icon-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Current Borrowers</h3>

            {borrowers.length === 0 ? (
              <p className="modal-sub">No borrowers currently.</p>
            ) : (
              <div className="borrowers-list">
                {borrowers.map((user, index) => (
                  <div key={index} className="borrower-item">
                    <div className="borrower-avatar">
                      {user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <div className="borrower-info">
                      <span className="borrower-name">{user.full_name}</span>
                      <span className="borrower-email">{user.email}</span>
                      <span className="borrower-date">Borrowed: {user.borrow_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="confirm-actions" style={{ marginTop: "20px" }}>
              <button className="cancel-btn" onClick={() => setShowBorrowersModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageBooks;
