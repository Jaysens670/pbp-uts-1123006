export interface Borrower {
  nama: string;
}

export interface Buku {
  id: string;
  judul: string;
  deskripsi: string;
  tahun: string;
  kategori: string;
  status: "available" | "borrowed";
borrower: Borrower | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateBukuPayload {
  judul: string;
  deskripsi: string;
  tahun: string;
  kategori: string;
}

export interface PinjamPayload {
  borrower: Borrower;
}