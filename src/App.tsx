import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ListMenu } from "./pages/ListBuku";
import { TambahMenu } from "./pages/TambahBuku";
import { UpdateMenu } from "./pages/UpdateBuku";

export function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ListMenu />} />
          <Route path="/tambah" element={<TambahMenu />} />
          <Route path="/update/:id" element={<UpdateMenu />} />
        </Routes>
      </main>
    </div>
  );
}