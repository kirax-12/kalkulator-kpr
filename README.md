# Kalkulator KPR

**Demo live:** [kalkulator-kpr di GitHub Pages](https://kirax-12.github.io/kalkulator-kpr/)

Hitung cicilan KPR per bulan sebelum ngobrol sama bank. Masukkan harga rumah, uang muka, bunga, dan tenor — cicilannya langsung keluar, lengkap dengan rincian pokok dan bunga per tahun sampai lunas.

## Fitur

- **Input lengkap**: harga properti, uang muka (slider 0–50% dengan nominal Rupiah-nya), suku bunga per tahun, dan tenor 1–30 tahun.
- **Hitung otomatis**: hasil berubah setiap kali input digeser atau diketik, tanpa tombol hitung.
- **Hasil jelas**: cicilan per bulan ditampilkan besar, plus jumlah pinjaman (plafon), nominal DP, total bunga, dan total yang dibayar sampai lunas.
- **Rincian per tahun**: tabel pokok terbayar, bunga terbayar, dan sisa pinjaman untuk tiap tahun — kelihatan jelas porsi bunga yang besar di tahun-tahun awal.
- **Format Rupiah** pakai `Intl.NumberFormat('id-ID')`.

## Cara hitung

Pakai rumus anuitas standar:

- Bunga bulanan `r = bunga tahunan / 12 / 100`
- Jumlah cicilan `n = tenor (tahun) × 12`
- Cicilan per bulan `= P × r / (1 − (1 + r)^−n)`, dengan `P` = harga properti − uang muka

Kalau bunga 0%, cicilan dihitung rata: plafon dibagi jumlah bulan. Tabel tahunan dibuat dengan mensimulasikan amortisasi bulan per bulan lalu menjumlahkannya per tahun.

## Catatan

Ini **estimasi kasar**. Perhitungan menganggap bunga tetap (fixed) selama tenor, padahal di bank bunga KPR umumnya hanya fixed 1–5 tahun pertama lalu floating. Biaya provisi, administrasi, notaris, dan asuransi juga belum termasuk. Selalu cek simulasi resmi dari bank sebelum tanda tangan apa pun.

## Teknologi

HTML, CSS, dan JavaScript murni — tanpa framework, tanpa build step. Tinggal buka `index.html` di browser.

## Lisensi

Bebas dipakai dan diubah. Dibuat oleh Remike Dev.
