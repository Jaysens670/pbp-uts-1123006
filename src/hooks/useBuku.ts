import { useState, useEffect, useCallback } from "react";
import type { Buku } from "../types/buku";
import * as api from "../api/APIbuku";

export function useBuku() {
  const [buku, setBuku] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil semua daftar buku [cite: 2, 4]
  const loadBuku = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.fetchSemuaBuku();
      // Mengambil data dari properti "data" sesuai struktur response API 
      setBuku(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBuku();
  }, [loadBuku]);

  // Fungsi Pinjam Buku sesuai endpoint POST /api/buku/:id/pinjam [cite: 45]
  const pinjam = async (id: string, namaPeminjam: string) => {
    try {
      // Payload dikirim dengan properti "peminjam" yang berisi "nama" [cite: 49, 51]
      await api.pinjamBuku(id, namaPeminjam);
      await loadBuku(); // Refresh data setelah berhasil [cite: 56]
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal meminjam";
      alert(msg);
    }
  };

  // Fungsi Kembalikan Buku sesuai endpoint POST /api/buku/:id/balik [cite: 57, 59]
  const balik = async (id: string) => {
    try {
      await api.kembalikanBuku(id);
      await loadBuku(); // Refresh data setelah berhasil [cite: 65]
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengembalikan";
      alert(msg);
    }
  };

  return { buku, loading, error, loadBuku, pinjam, balik };
}