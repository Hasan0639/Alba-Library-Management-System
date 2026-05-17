import "../Home/Home.css";
import "./Profile.css";
import { useState } from "react";
import albaLogo from "../../assets/alba-logo.png";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const fullName = localStorage.getItem("full_name");
  const userId = localStorage.getItem("user_id");

  const initials = (fullName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  fetch(`http://localhost/library-api/getUser.php?user_id=${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setName(data.full_name);
      setEmail(data.email);
      setRole(data.role);
      setStatus(data.status);
    });

  const saveProfile = async () => {
    const response = await fetch("http://localhost/library-api/updateUser.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        name,
        email,
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Profile updated");
      setEditing(false);
    } else {
      alert("Update failed");
    }
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
          <a href="/Books" className="nav-link">Books</a>
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
          <h1>My Profile</h1>
          <p>View and update your account information</p>
        </div>
      </div>

      {/* ── PROFILE CONTENT ── */}
      <div className="profile-container">
        <div className="profile-card">

          {/* Avatar + Name */}
          <div className="profile-top">
            <div className="profile-avatar-large">{initials}</div>
            <div className="profile-top-info">
              <h2>{name || fullName}</h2>
              <div className="profile-badges">
                <span className="role-badge-lg">{role}</span>
                <span className={`profile-status-badge ${status === "Active" ? "status-active" : "status-inactive"}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-divider" />

          {/* Fields */}
          <div className="profile-fields">
            <div className="profile-field-group">

              <div className="profile-field">
                <span className="field-label">Full Name</span>
                {editing ? (
                  <input
                    className="profile-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                  />
                ) : (
                  <span className="field-value">{name}</span>
                )}
              </div>

              <div className="profile-field">
                <span className="field-label">Email Address</span>
                {editing ? (
                  <input
                    className="profile-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                ) : (
                  <span className="field-value">{email}</span>
                )}
              </div>

              <div className="profile-field">
                <span className="field-label">Role</span>
                <span className="field-value">{role}</span>
              </div>

              <div className="profile-field">
                <span className="field-label">Account Status</span>
                <span className={`field-status ${status === "Active" ? "status-active" : "status-inactive"}`}>
                  {status}
                </span>
              </div>

            </div>
          </div>

          <div className="profile-divider" />

          {/* Action Button */}
          <div className="profile-actions">
            {editing ? (
              <>
                <button className="profile-cancel-btn" onClick={() => setEditing(false)}>
                  Cancel
                </button>
                <button className="profile-save-btn" onClick={saveProfile}>
                  Save Changes
                </button>
              </>
            ) : (
              <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                ✎ Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
