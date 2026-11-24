import { BATAS_MENIPIS } from "./data-barang";
/** "habis | menipis | tersedia" */
export function statusStok(stok, batas = BATAS_MENIPIS) {
  if (stok === 0) return "Habis";
  if (stok < batas) return "Menipis";
  return "Tersedia";
}

// Mengelompokkan daftar barang berdasarkan kategori
export const kelompokkanKategori = (daftar) => 
daftar.reduce((hasil, b) => {
  hasil[b.kategori] = [...(hasil[b.kategori] ?? []), b];
  return hasil;
}, {});

export function ringkasanStok(daftar) {
  return {
    jumlahJenis: daftar.length,
    totalUnit: daftar.reduce((t, b) => t + b.stok, 0),
    nilaiPersediaan: daftar.reduce((t, b) => t + b.harga * b.stok, 0),
    habis: daftar.filter((b) => statusStok(b.stok) === "Habis").length,
    menipis: daftar.filter((b) => statusStok(b.stok) === "Menipis").length,
    tersedia: daftar.filter((b) => statusStok(b.stok) === "Tersedia").length,
  }
}