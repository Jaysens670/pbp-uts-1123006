import { useState } from "react";
import { Link } from "react-router-dom";
import type { Buku } from "../types/buku";
import "./BookCard.css";

interface BookCardProps {
  book: Buku;
  onPinjam: (id: string, nama: string) => void;
  onBalik: (id: string) => void;
}

export function BookCard({ book, onPinjam, onBalik }: BookCardProps) {
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [showModal, setShowModal] = useState(false);
  const isBorrowed = book.status === "borrowed";

  const handlePinjam = () => {
    if (!namaPeminjam.trim()) return;
    onPinjam(book.id, namaPeminjam.trim());
    setShowModal(false);
    setNamaPeminjam("");
  };

  return (
    <div className="book-card">
      <img src={book.imageUrl || "/placeholder.jpg"} alt={book.judul} className="book-image" />
      <div className="book-content">
        <h3>{book.judul}</h3>
        <p className="deskripsi">{book.deskripsi}</p>
        <div className="book-meta">
          <span>{book.tahun}</span>
          <span>{book.kategori}</span>
        </div>
        <div className={`status status-${book.status}`}>
          {isBorrowed ? `Dipinjam: ${book.borrower?.nama}` : "Tersedia"}
        </div>
        <div className="book-actions">
          <Link to={`/update/${book.id}`} className="btn btn-edit">Edit</Link>
          {isBorrowed ? (
            <button className="btn btn-balik" onClick={() => onBalik(book.id)}>
              Kembalikan
            </button>
          ) : (
            <button className="btn btn-pinjam" onClick={() => setShowModal(true)}>
              Pinjam
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>Pinjam Buku</h4>
            <input
              type="text"
              placeholder="Nama peminjam"
              value={namaPeminjam}
              onChange={(e) => setNamaPeminjam(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Batal</button>
              <button onClick={handlePinjam}>Pinjam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}