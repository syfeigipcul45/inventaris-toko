"use client";
import { useKeranjang } from "@/context/KeranjangContext";
import { menujuDiskonBerikutnya } from "@/lib/keranjang";
import { formatRupiah } from "@/lib/format";
export default function RingkasanBelanja() {
  const { ringkasan } = useKeranjang();
  const berikut = menujuDiskonBerikutnya(ringkasan.subtotal);
  return (
    <dl className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm">
      <div className="flex items-center justify-between gap-4 text-slate-600">
        <dt>Subtotal</dt>
        <dd className="font-medium tabular-nums text-slate-900">
          {formatRupiah(ringkasan.subtotal)}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 text-emerald-700">
        <dt>Diskon {ringkasan.persen}%</dt>
        <dd className="font-medium tabular-nums">
          −{formatRupiah(ringkasan.diskon)}
        </dd>
      </div>
      <div
        className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3 text-base font-bold text-slate-900"
      >
        <dt>Total</dt>
        <dd data-testid="total" className="tabular-nums">
          {formatRupiah(ringkasan.total)}
        </dd>
      </div>
      {berikut && ringkasan.subtotal > 0 && (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
          Belanja <span className="font-semibold text-slate-800">{formatRupiah(berikut.kurang)}</span> lagi untuk mendapat diskon {berikut.persen}%.
        </p>
      )}
    </dl>
  );
}
