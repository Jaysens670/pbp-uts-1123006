import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const now = () => new Date().toISOString();

let books = [
  {
    id: uuid(),
    judul: "Boruto: Naruto Next Generations",
    deskripsi: "Petualangan generasi baru ninja Konoha yang dipimpin oleh Boruto Uzumaki.",
    tahun: "2016",
    kategori: "komik",
    status: "available",
    peminjam: null,
    imageUrl: "https://uts-pbp-0sipdzol.hansyulian.space/images/boruto.jpg",
    createdAt: now(),
    updatedAt: now(),
  },
];

function findBook(id) {
  return books.find((b) => b.id === id);
}

app.get("/", (_req, res) => {
  res.json({ message: "Buku API UTS PBP", endpoints: "/api/buku" });
});

app.get("/api/buku", (_req, res) => {
  res.status(200).json({ data: books });
});

app.get("/api/buku/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
  res.status(200).json({ data: book });
});

app.put("/api/buku/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
  const { data } = req.body || {};
  if (!data) return res.status(400).json({ message: "Payload harus berisi objek 'data'" });
  const { judul, deskripsi, tahun, kategori } = data;
  if (!judul || !deskripsi || !tahun || !kategori) {
    return res.status(400).json({ message: "Field judul, deskripsi, tahun, dan kategori wajib diisi" });
  }
  book.judul = judul;
  book.deskripsi = deskripsi;
  book.tahun = tahun;
  book.kategori = kategori;
  book.updatedAt = now();
  res.status(200).json({ message: "Buku berhasil diupdate" });
});

app.post("/api/buku/:id/pinjam", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
  if (book.status === "borrowed") return res.status(400).json({ message: "Buku sudah dipinjam" });
  const { peminjam } = req.body || {};
  if (!peminjam?.nama) return res.status(400).json({ message: "Payload harus berisi 'peminjam.nama'" });
  book.status = "borrowed";
  book.peminjam = { nama: peminjam.nama };
  book.updatedAt = now();
  res.status(200).json({ message: "Buku berhasil dipinjam" });
});

app.post("/api/buku/:id/balik", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
  if (book.status !== "borrowed") return res.status(400).json({ message: "Buku tidak sedang dipinjam" });
  book.status = "available";
  book.peminjam = null;
  book.updatedAt = now();
  res.status(200).json({ message: "Buku berhasil dikembalikan" });
});

app.listen(PORT, () => console.log(`API: http://localhost:${PORT}`));