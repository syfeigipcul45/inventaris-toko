"use client";
import { useState } from "react";
// lib/kueri.js — pencarian, filter, pengurutan, dan pagination sebagai satu fungsi murni.

const PILIHAN_URUT = {
  "nama-naik": {
    label: "Nama A–Z",
    banding: (a, b) => a.nama.localeCompare(b.nama, "id"),
  },
  "harga-naik": {
    label: "Harga termurah",
    banding: (a, b) => a.harga - b.harga,
  },
  "harga-turun": {
    label: "Harga termahal",
    banding: (a, b) => b.harga - a.harga,
  },
  "stok-naik": {
    label: "Stok paling sedikit",
    banding: (a, b) => a.stok - b.stok,
  },
};

/**
 * @param {Array} daftar
 * @param {{kata?:string, kategori?:string, urut?:string, halaman?:number, perHalaman?:number}} kueri
 * @returns {{data:Array, total:number, totalHalaman:number, halaman:number}}
 */
function terapkanKueri(
  daftar,
  {
    kata = "",
    kategori = "",
    urut = "nama-naik",
    halaman = 1,
    perHalaman = 5,
  } = {},
) {
  const k = kata.trim().toLowerCase();
  const tersaring = daftar
    .filter(
      (b) =>
        !k ||
        b.nama.toLowerCase().includes(k) ||
        b.kode.toLowerCase().includes(k),
    )
    .filter((b) => !kategori || b.kategori === kategori);

  const terurut = [...tersaring].sort(
    (PILIHAN_URUT[urut] ?? PILIHAN_URUT["nama-naik"]).banding,
  );

  const total = terurut.length;
  const totalHalaman = Math.max(1, Math.ceil(total / perHalaman));
  const h = Math.min(Math.max(1, halaman), totalHalaman);
  const awal = (h - 1) * perHalaman;

  return {
    data: terurut.slice(awal, awal + perHalaman),
    total,
    totalHalaman,
    halaman: h,
  };
}

const DATA = [
  {
    id: 1,
    kode: "ATK-001",
    nama: "Buku Tulis 58 Lembar",
    kategori: "Alat Tulis",
    harga: 5000,
    stok: 120,
  },
  {
    id: 2,
    kode: "ATK-002",
    nama: "Pensil 2B",
    kategori: "Alat Tulis",
    harga: 3000,
    stok: 0,
  },
  {
    id: 3,
    kode: "ATK-003",
    nama: "Spidol Hitam",
    kategori: "Alat Tulis",
    harga: 9000,
    stok: 15,
  },
  {
    id: 4,
    kode: "MKN-001",
    nama: "Mi Instan Goreng",
    kategori: "Makanan",
    harga: 3500,
    stok: 200,
  },
  {
    id: 5,
    kode: "MKN-002",
    nama: "Roti Cokelat",
    kategori: "Makanan",
    harga: 8000,
    stok: 0,
  },
  {
    id: 6,
    kode: "MKN-003",
    nama: "Biskuit Kelapa",
    kategori: "Makanan",
    harga: 7500,
    stok: 8,
  },
  {
    id: 7,
    kode: "MNM-001",
    nama: "Air Mineral 600 ml",
    kategori: "Minuman",
    harga: 4000,
    stok: 48,
  },
  {
    id: 8,
    kode: "MNM-002",
    nama: "Teh Botol",
    kategori: "Minuman",
    harga: 6000,
    stok: 5,
  },
  {
    id: 9,
    kode: "MNM-003",
    nama: "Kopi Sachet",
    kategori: "Minuman",
    harga: 2000,
    stok: 90,
  },
  {
    id: 10,
    kode: "KBR-001",
    nama: "Sabun Mandi",
    kategori: "Kebersihan",
    harga: 4500,
    stok: 36,
  },
  {
    id: 11,
    kode: "KBR-002",
    nama: "Pasta Gigi",
    kategori: "Kebersihan",
    harga: 12000,
    stok: 3,
  },
  {
    id: 12,
    kode: "KBR-003",
    nama: "Sabun Cuci Piring",
    kategori: "Kebersihan",
    harga: 15000,
    stok: 22,
  },
];

export default function DemoKueri() {
  const [kueri, setKueri] = useState({
    kata: "",
    kategori: "",
    urut: "nama-naik",
    halaman: 1,
  });
  const ubah = (p) => setKueri((l) => ({ ...l, ...p, halaman: 1 }));
  const hasil = terapkanKueri(DATA, kueri);
  return (
    <div className="space-y-3 text-sm">
      <div className="grid grid-cols-3 gap-2">
        <input
          value={kueri.kata}
          onChange={(e) => ubah({ kata: e.target.value })}
          placeholder="Cari…"
          className="rounded border px-2 py-1"
        />
        <select
          value={kueri.kategori}
          onChange={(e) => ubah({ kategori: e.target.value })}
          className="rounded border px-2 py-1"
        >
          <option value="">Semua kategori</option>
          {["Alat Tulis", "Makanan", "Minuman", "Kebersihan"].map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <select
          value={kueri.urut}
          onChange={(e) => ubah({ urut: e.target.value })}
          className="rounded border px-2 py-1"
        >
          {Object.entries(PILIHAN_URUT).map(([n, p]) => (
            <option key={n} value={n}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <p>
        {hasil.total} hasil · halaman {hasil.halaman} dari {hasil.totalHalaman}
      </p>
      <table className="w-full">
        <tbody>
          {hasil.data.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="py-1">{b.kode}</td>
              <td>{b.nama}</td>
              <td className="text-right">{b.harga}</td>
              <td className="text-right">{b.stok}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-1">
        {Array.from({ length: hasil.totalHalaman }, (_, i) => i + 1).map(
          (n) => (
            <button
              key={n}
              onClick={() => setKueri((l) => ({ ...l, halaman: n }))}
              className={`h-8 w-8 rounded border ${n === hasil.halaman ? "bg-teal-700 text-white" : ""}`}
            >
              {n}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
