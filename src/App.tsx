import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { lazy } from "react";

const ListBuku = lazy(() => import("./pages/ListBuku"));
// const UpdateBuku = lazy(() => import("./pages/UpdateBuku"));
// const DetailBuku = lazy(() => import("./pages/DetailBuku"));


export function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ListBuku />} />
          {/* <Route path="/buku/:id" element={<DetailBuku />} /> Page Detail */}
        </Routes>
      </main>
    </div>
  );
}