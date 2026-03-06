import React, { useState } from "react";
import type { UpdateBukuPayload } from "../types/buku";

interface BookFormProps {
  initialValues?: Partial<UpdateBukuPayload>;
  onSubmit: (data: UpdateBukuPayload) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function BookForm({ initialValues = {}, onSubmit, isLoading, submitLabel = "Save" }: BookFormProps) {
  const [judul, setJudul] = useState(initialValues.judul ?? "");
  const [deskripsi, setDeskripsi] = useState(initialValues.deskripsi ?? "");
  const [tahun, setTahun] = useState(initialValues.tahun ?? "");
  const [kategori, setKategori] = useState(initialValues.kategori ?? "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!judul.trim() || !deskripsi.trim() || !tahun.trim() || !kategori.trim()) {
      setError("Semua field wajib diisi");
      return;
    }
    try {
      await onSubmit({ judul: judul.trim(), deskripsi: deskripsi.trim(), tahun, kategori });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ada Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      {error && <div className="form-error">{error}</div>}
      <label>Judul</label>
      <input value={judul} onChange={(e) => setJudul(e.target.value)} required />
      <label>Deskripsi</label>
      <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
      <label>Tahun</label>
      <input value={tahun} onChange={(e) => setTahun(e.target.value)} required />
      <label>Kategori</label>
      <input value={kategori} onChange={(e) => setKategori(e.target.value)} required />
      <button type="submit" disabled={isLoading}>{isLoading ? "Lagi Memproses..." : submitLabel}</button>
    </form>
  );
}