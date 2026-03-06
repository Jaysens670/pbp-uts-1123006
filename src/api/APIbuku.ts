import type { Buku, UpdateBukuPayload, PinjamPayload } from "../types/buku";

const API_BASE = "/api/buku";

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

export async function fetchSemuaBuku(): Promise<{ data: Buku[] }> {
  return customFetch<{ data: Buku[] }>(API_BASE, { method: 'GET' });
}

export async function fetchBukuById(id: string): Promise<{ data: Buku }> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error("Gagal mengambil detail buku");
  return await response.json();
}
export async function updateBuku(id: string, payload: UpdateBukuPayload): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT', // [cite: 27]
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });
  if (!response.ok) throw new Error("Gagal update buku");
  return await response.json();
}

export async function pinjamBuku(id: string, namaPeminjam: string): Promise<{ message: string }> {
  return customFetch(`${API_BASE}/${id}/pinjam`, {
    method: 'POST',
    body: JSON.stringify({
      peminjam: { nama: namaPeminjam }
    }),
  });
}

export async function kembalikanBuku(id: string): Promise<{ message: string }> {
  return customFetch(`${API_BASE}/${id}/balik`, {
    method: 'POST',
  });
}