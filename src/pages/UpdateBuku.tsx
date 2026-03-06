// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import * as api from "../api/APIbuku";

// export default function EditBuku() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ judul: "", deskripsi: "", tahun: "" });

//   useEffect(() => {
//     if (id) {
//       api.fetchBukuById(id).then(res => {
//         setFormData({
//           judul: res.data.judul,
//           deskripsi: res.data.deskripsi,
//           tahun: res.data.tahun
//         });
//       });
//     }
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await api.updateBuku(id, formData);
//         alert("Buku berhasil diupdate!");
//         navigate("/");
//       }
//     } catch (err) {
//       alert("Gagal update");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Edit Buku</h2>
//       <form onSubmit={handleSubmit}>
//         <input 
//           value={formData.judul} 
//           onChange={(e) => setFormData({...formData, judul: e.target.value})} 
//           placeholder="Judul" 
//         />
//         <textarea 
//           value={formData.deskripsi} 
//           onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} 
//           placeholder="Deskripsi" 
//         />
//         <button type="submit">Simpan Perubahan</button>
//       </form>
//     </div>
//   );
// }