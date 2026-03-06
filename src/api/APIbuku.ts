import type { Buku, UpdateBukuPayload, PinjamPayload } from "../types/buku";

const API_BASE = "/api/buku";

/**
 * Fungsi pembantu fetch sesuai standar yang Anda inginkan
 */
async function customFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Request Failed");
  }

  return await response.json();
}

// 1. Ambil Semua Buku [cite: 2, 4]
export async function fetchSemuaBuku(): Promise<{ data: Buku[] }> {
  return customFetch<{ data: Buku[] }>(API_BASE, { method: 'GET' });
}

// 2. Ambil Buku Berdasarkan ID [cite: 6, 8]
export async function fetchBukuById(id: string): Promise<{ data: Buku }> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error("Gagal mengambil detail buku");
  return await response.json(); // Mengembalikan { data: Buku } [cite: 12]
}
// 3. Update Data Buku [cite: 25, 27]
// Payload harus dibungkus di dalam objek 'data' 
export async function updateBuku(id: string, payload: UpdateBukuPayload): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT', // [cite: 27]
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }), // Data harus dibungkus dalam objek data [cite: 26, 31]
  });
  if (!response.ok) throw new Error("Gagal update buku");
  return await response.json(); // Mengembalikan { message: "..." } [cite: 39, 41]
}

// 4. Pinjam Buku [cite: 42, 45]
// Payload menggunakan properti 'peminjam' 
export async function pinjamBuku(id: string, namaPeminjam: string): Promise<{ message: string }> {
  return customFetch(`${API_BASE}/${id}/pinjam`, {
    method: 'POST',
    body: JSON.stringify({
      peminjam: { nama: namaPeminjam } // [cite: 49, 51]
    }),
  });
}

// 5. Kembalikan Buku (Balik) [cite: 57, 59]
export async function kembalikanBuku(id: string): Promise<{ message: string }> {
  return customFetch(`${API_BASE}/${id}/balik`, {
    method: 'POST', // [cite: 59]
  });
}