"use client";
import { useEffect, useState } from "react";
export default function Jam() {
  const [waktu, setWaktu] = useState(() => new Date());
  const [aktif, setAktif] = useState(true);
  useEffect(() => {
    if (!aktif) return;
    console.log("efek: pasang interval");
    const id = setInterval(() => setWaktu(new Date()), 1000);
    return () => {
      console.log("cleanup: hapus interval");
      clearInterval(id);
    };
  }, [aktif]);
  return (
    <div className="space-x-3">
      <span className="font-mono text-2xl">
        {waktu.toLocaleTimeString("id-ID")}
      </span>

      <button
        onClick={() => setAktif((a) => !a)}
        className="rounded border
px-3 py-1"
      >
        {aktif ? "Jeda" : "Lanjut"}
      </button>
    </div>
  );
}
