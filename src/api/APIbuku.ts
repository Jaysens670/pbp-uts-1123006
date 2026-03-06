import type { Buku, UpdateBukuPayload, PinjamPayload } from "../types/buku";

const API_BASE = "/api/buku";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Ada error bang");
  return data;
}

export async function fetchSemuaBuku(): Promise<{ data: Buku[] }> {
  const res = await fetch(API_BASE);
  return handleResponse(res);
}

export async function fetchBukuById(id: string): Promise<{ data: Buku }> {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse(res);
}

export async function updateBuku(id: string, payload: UpdateBukuPayload): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  return handleResponse(res);
}

export async function pinjamBuku(id: string, payload: PinjamPayload): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/${id}/pinjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function kembalikanBuku(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/${id}/balik`, { method: "POST" });
  return handleResponse(res);
}