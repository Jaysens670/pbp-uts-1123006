import { useBuku } from "../hooks/useBuku";
import { BookCard } from "../components/BookCard";
import "./ListBuku.css";

export default function ListMenu() {
  const { buku, loading, error, pinjam, balik } = useBuku();

  if (loading) return <div className="container"><p className="loading">Loading...</p></div>;
  if (error) return <div className="container"><p className="no-data" style={{ color: "#c0392b" }}>{error}</p></div>;
  if (!buku.length) return <div className="container"><p className="no-data">Belum ada buku</p></div>;

  return (
    <div className="container">
      <h1>Daftar Buku</h1>
      <div className="books-grid">
        {buku.map((b) => (
          <BookCard key={b.id} book={b} onPinjam={pinjam} onBalik={balik} />
        ))}
      </div>
    </div>
  );
}