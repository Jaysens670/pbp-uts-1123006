import { useNavigate } from "react-router-dom";
import { BookForm } from "../components/BookForm";

export function TambahMenu() {
  const navigate = useNavigate();

  const handleSubmit = async (_data: { judul: string; deskripsi: string; tahun: string; kategori: string }) => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Tambah Buku</h1>
      <BookForm onSubmit={handleSubmit} submitLabel="Add" />
    </div>
  );
}