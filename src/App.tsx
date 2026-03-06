import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { lazy } from "react";

const LazyListMenu = lazy(() => import("./pages/ListBuku"));
const LazyTambahMenu = lazy(() => import("./pages/TambahBuku"));
const LazyUpdateMenu = lazy(() => import("./pages/UpdateBuku"));

export function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LazyListMenu />} />
          <Route path="/tambah" element={<LazyTambahMenu />} />
          <Route path="/update/:id" element={<LazyUpdateMenu />} />
        </Routes>
      </main>
    </div>
  );
}