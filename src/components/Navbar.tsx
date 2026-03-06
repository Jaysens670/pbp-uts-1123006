import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav style={{
      background: "#2c3e50",
      padding: "1rem 2rem",
      display: "flex",
      gap: "1.5rem",
      alignItems: "center",
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.25rem" }}>
        Perpustakaan
      </Link>
      <Link to="/" style={{ color: "#bdc3c7", textDecoration: "none" }}>Daftar Buku</Link>
      <Link to="/tambah" style={{ color: "#bdc3c7", textDecoration: "none" }}>Tambah Buku</Link>
    </nav>
  );
}