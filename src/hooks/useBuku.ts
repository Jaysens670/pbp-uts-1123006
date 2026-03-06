import { useState, useEffect, useCallback } from "react";
import type { Buku } from "../types/buku";
import * as api from "../api/APIbuku";

export function useBuku() {
  const [buku, setBuku] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBuku = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.fetchSemuaBuku();
      setBuku(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBuku();
  }, [loadBuku]);

  const pinjam = async (id: string, namaPeminjam: string) => {
    await api.pinjamBuku(id, { borrower: { nama: namaPeminjam } });
    await loadBuku();
  };

  const balik = async (id: string) => {
    await api.kembalikanBuku(id);
    await loadBuku();
  };

  return { buku, loading, error, loadBuku, pinjam, balik };
}