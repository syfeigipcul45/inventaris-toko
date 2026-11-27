import {
  keranjangReducer as r,
  KERANJANG_AWAL,
  hitungRingkasan,
} from "../../lib/keranjang.js";
import { daftarBarang as d } from "../../lib/data-barang.js";
import {
  skemaBarang,
  buatSkemaPembayaran,
  galatPerKolom,
} from "../../lib/skema.js";
const b = (id) => d.find((x) => x.id === id);
let s = KERANJANG_AWAL;
s = r(s, { type: "tambah", barang: b(12) }); // Sabun Cuci Piring
s = r(s, { type: "tambah", barang: b(12) });
s = r(s, { type: "tambah", barang: b(2) }); // Pensil 2B, stok 0
console.log(
  s.item.map((i) => [i.nama, i.jumlah]),
  hitungRingkasan(s.item),
);
console.log(
  galatPerKolom(
    skemaBarang.safeParse({
      kode: "atk-1",
      nama: "ab",
      kategori: "",
      harga: "",
      stok: "-1",
      satuan: " ",
    }),
  ),
);
console.log(
  skemaBarang.safeParse({
    kode: "ATK-004",
    nama: "Penggaris",
    kategori: "Alat Tulis",
    harga: "7000",
    stok: "10",
    satuan: "pcs",
  }).data,
);
const sp = buatSkemaPembayaran(58500);
console.log(
  galatPerKolom(
    sp.safeParse({ pelanggan: "", metode: "tunai", bayar: "50000" }),
  ),
);
console.log(
  sp.safeParse({ pelanggan: " Budi ", metode: "tunai", bayar: "100000" }).data,
);
console.log(sp.safeParse({ pelanggan: "", metode: "qris", bayar: "" }).success);
