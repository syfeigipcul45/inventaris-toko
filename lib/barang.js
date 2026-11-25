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
  };
}

/** Ubah data form (string) menjadi objek barang dengan tipe yang benar. */
export const rapikanBarang = (data) => ({
  kode: data.kode.trim(),
  nama: data.nama.trim(),
  kategori: data.kategori,
  harga: Number(data.harga),
  stok: Number(data.stok),
  satuan: data.satuan.trim(),
});

export function tambahBarang(daftar, data) {
  const idBaru =
    daftar.length === 0 ? 1 : Math.max(...daftar.map((b) => b.id)) + 1;
  return [...daftar, { id: idBaru, ...rapikanBarang(data) }];
}

/** Ganti data barang dengan id tertentu. Mengembalikan array baru. */
export const ubahBarang = (daftar, id, data) =>
  daftar.map((b) => (b.id === id ? { ...b, ...rapikanBarang(data) } : b));
/** Hapus barang dengan id tertentu. Mengembalikan array baru. */
export const hapusBarang = (daftar, id) => daftar.filter((b) => b.id !== id);
