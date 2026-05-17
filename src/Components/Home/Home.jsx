import "./Home.css";
import albaLogo from "../../assets/alba-logo.png";
import albaImage from "../../assets/Alba-Pic.jpg";

function Home() {
  const fullName = localStorage.getItem("full_name") || "User";
  const role = localStorage.getItem("role") || "employee";

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="page-wrapper">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <img src={albaLogo} alt="Alba Logo" className="nav-brand-logo" />
          <span className="nav-brand-name">Alba Library</span>
        </div>

        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="/Books" className="nav-link">Books</a>
          {role !== "admin" && (
            <a href="/my-list" className="nav-link">My List</a>
          )}
          <div className="nav-divider" />
          <a href="/Profile" className="profile-chip">
            <div className="profile-avatar">{initials}</div>
            <span className="profile-name">{fullName}</span>
            <span className="role-badge">{role}</span>
          </a>
          <button
            className="logout-btn"
            onClick={() => (window.location.href = "/")}
          >
            Logout
          </button>
        </div>
      </nav>

      
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Aluminium Bahrain — Digital Library
          </div>
          <h1 className="hero-title">
            Knowledge at the<br />
            <em>Heart of Alba</em>
          </h1>
          <p className="hero-subtitle">
            A professional platform for managing books, borrowing operations,
            and library services — built for the people of Alba Bahrain.
          </p>
          <div className="hero-cta">
            <a href="/Books" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Browse Books
            </a>
            {role !== "admin" && (
              <a href="/my-list" className="btn-ghost">
                View My List →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services-section">
        <div className="section-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Library Services</h2>
          <p className="section-desc">
            The Alba Library System provides employees and administrators with
            a centralized platform to manage books efficiently, monitor
            borrowing records, and improve access to knowledge across the
            organization.
          </p>
        </div>
        <div className="service-cards">
          <div className="service-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19V7l8-4 8 4v12H4z" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            </div>
            <h3>Book Management</h3>
            <p>Add, update, and organize the full library catalog with professional-grade tools for administrators.</p>
          </div>
          <div className="service-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Borrowing System</h3>
            <p>Track and manage borrowed and returned books efficiently with complete borrowing history records.</p>
          </div>
          <div className="service-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <h3>User Profiles</h3>
            <p>Manage employee and administrator accounts securely with role-based access controls.</p>
          </div>
        </div>
      </section>

      {/* ── ABOUT ALBA ── */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-image-wrap">
            <img src={albaImage} alt="Alba Bahrain facility" />
            <div className="about-badge">
              <span className="badge-num">50+</span>
              <span className="badge-label">Years of Excellence</span>
            </div>
          </div>
          <div className="about-text">
            <div className="about-tag">About Alba</div>
            <h2 className="about-title">Supporting Knowledge and Development</h2>
            <div className="about-divider" />
            <p>
              Aluminium Bahrain (Alba) is one of the world's largest aluminium
              smelters and a leading industrial company in the Kingdom of Bahrain.
              Alba supports the national economy through innovation,
              sustainability, operational excellence, and workforce development.
            </p>
            <p>
              The Alba Library System helps employees and administrators access
              books, technical resources, safety materials, and professional
              development references in one centralized platform.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p className="footer-copy">© 2026 ALBA Library System</p>
        <img src={albaLogo} alt="ALBA Logo" className="footer-logo" />
      </footer>

    </div>
  );
}

export default Home;
