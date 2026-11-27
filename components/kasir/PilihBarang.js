"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useKeranjang } from "@/context/KeranjangContext";
import { formatRupiah } from "@/lib/format";
export default function PilihBarang({ daftar }) {
  const [kata, setKata] = useState("");
  const { item, tambah } = useKeranjang();
  const k = kata.trim().toLowerCase();
  const tampil = daftar.filter(
    (b) =>
      !k ||
      b.nama.toLowerCase().includes(k) ||
      b.kode.toLowerCase().includes(k),
  );
  return (
    <div className="space-y-3">
      <label className="relative block">
        <span className="sr-only">Cari barang</span>
        <Search
          size={16}
          className="absolute left-3 top-3 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari nama atau kode…"
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />
      </label>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tampil.map((b) => {
          const diKeranjang = item.find((i) => i.id === b.id)?.jumlah ?? 0;
          const sisa = b.stok - diKeranjang;
          return (
            <li
              key={b.id}
              className="flex min-h-36 flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold leading-snug text-slate-900">{b.nama}</p>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                    {b.kode}
                  </span>
                </div>
                <p className="text-lg font-bold tabular-nums text-teal-800">
                  {formatRupiah(b.harga)}
                </p>
                <p className="text-xs text-slate-500">Stok tersedia: {sisa} {b.satuan}</p>
              </div>
              <button
                onClick={() => tambah(b)}
                disabled={sisa <= 0}
                aria-label={`Tambah ${b.nama} ke keranjang`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Plus size={18} aria-hidden="true" />
                
              </button>
            </li>
          );
        })}
      </ul>
      {tampil.length === 0 && (
        <p className="text-slate-500">Tidak ada barang yang cocok.</p>
      )}
    </div>
  );
}
