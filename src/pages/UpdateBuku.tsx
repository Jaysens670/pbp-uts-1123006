import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBukuById, updateBuku } from "../api/APIbuku";
import { BookForm } from "../components/BookForm";
import type { UpdateBukuPayload } from "../types/buku";

export function UpdateMenu() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<UpdateBukuPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchBukuById(id)
      .then(({ data }) => setInitialValues({ judul: data.judul, deskripsi: data.deskripsi, tahun: data.tahun, kategori: data.kategori }))
      .catch((err) => setError(err instanceof Error ? err.message : "Gagal memuat data"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (payload: UpdateBukuPayload) => {
    if (!id) return;
    await updateBuku(id, payload);
    navigate("/");
  };

  if (loading) return <div className="container"><p className="loading">Memuat...</p></div>;
  if (error) return <div className="container"><p style={{ color: "#c0392b" }}>{error}</p></div>;
  if (!initialValues) return null;

  return (
    <div className="container">
      <h1>Update Buku</h1>
      <BookForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
}