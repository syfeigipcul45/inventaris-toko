export const formatRupiah = (n) => {
  if (typeof n !== "number") {
    return "Rp0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const singkat = (teks, maks = 20) => teks.length <= maks ? teks : `${teks.slice(0, maks)}...`;