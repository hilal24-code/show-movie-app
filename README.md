# 🎬 Show Movie App

Aplikasi web untuk menjelajahi film, dibuat dengan **Angular**, **TypeScript**, dan **Tailwind CSS**. Data film diambil dari API [The Movie Database (TMDB)](https://www.themoviedb.org).

## ✨ Fitur

- **Daftar film** dalam tampilan grid kartu poster
- **Kategori film**: Populer, Rating Tertinggi, Sedang Tayang, Akan Tayang
- **Pencarian film** berdasarkan judul
- **Paginasi** untuk menjelajahi lebih dari 20 film
- **State tersimpan di URL** (kategori, kata pencarian, dan halaman), sehingga tombol Kembali dan link yang dibagikan menampilkan tampilan yang sama
- **Halaman detail film**: poster, rating, durasi, genre, sinopsis, trailer YouTube, dan daftar pemeran
- **Film favorit** yang disimpan di `localStorage` browser
- **Skeleton loading** saat data sedang dimuat
- **Penanganan error** dengan pesan ramah dan tombol "Coba lagi"
- **Pemulihan posisi scroll** saat kembali dari halaman detail

## 🛠️ Teknologi

| Bagian | Teknologi |
| --- | --- |
| Framework | Angular (standalone components, signals, SSR) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Sumber data | TMDB API v3 |

Palet warna: [Color Hunt](https://colorhunt.co/palette/09232812544f2a835f8bbb92)

| Nama | Kode |
| --- | --- |
| dark | `#092328` |
| deep | `#12544f` |
| primary | `#2a835f` |
| light | `#8bbb92` |

## 📋 Prasyarat

- [Node.js](https://nodejs.org) (versi LTS terbaru) dan npm
- Angular CLI:

  ```bash
  npm install -g @angular/cli
  ```

- API key TMDB (gratis). Daftar di [themoviedb.org](https://www.themoviedb.org), lalu ambil **API Key (v3 auth)** di menu Settings > API.

## 🚀 Menjalankan Proyek

1. Clone repositori dan masuk ke foldernya:

   ```bash
   git clone <url-repositori-kamu>
   cd show-movie-app
   ```

2. Install dependensi:

   ```bash
   npm install
   ```

3. Buat file environment (lihat bagian di bawah).

4. Jalankan server pengembangan:

   ```bash
   ng serve
   ```

5. Buka [http://localhost:4200](http://localhost:4200) di browser.

## 🔑 Konfigurasi API Key

Folder `src/environments/` sengaja dimasukkan ke `.gitignore` agar API key tidak ikut ter-push ke GitHub. Karena itu kamu perlu membuatnya sendiri setelah clone.

Generate file environment:

```bash
ng generate environments
```

Isi `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'ISI_API_KEY_KAMU',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageUrl: 'https://image.tmdb.org/t/p/w500',
};
```

Isi `src/environments/environment.ts` dengan nilai yang sama, tetapi `production: true`.

> **Catatan keamanan:** ini aplikasi frontend, jadi API key tetap bisa dilihat lewat DevTools browser. Itu dapat diterima untuk proyek belajar, tetapi jangan pernah meng-commit file environment ke repositori publik.

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── components/
│   │   ├── error-message/     # Kotak pesan error + tombol "Coba lagi"
│   │   ├── footer/            # Footer + atribusi TMDB
│   │   └── navbar/            # Navigasi atas + badge jumlah favorit
│   ├── models/
│   │   └── movie.model.ts     # Tipe data film, detail, pemeran, video
│   ├── pages/
│   │   ├── favorite-list/     # Halaman film favorit
│   │   ├── home/              # Daftar film, pencarian, kategori, paginasi
│   │   └── movie-detail/      # Detail film, trailer, pemeran
│   ├── services/
│   │   ├── favorites.ts       # Penyimpanan favorit di localStorage
│   │   └── tmdb.ts            # Komunikasi dengan TMDB API
│   ├── utils/
│   │   └── http-error.ts      # Penerjemah error HTTP ke pesan ramah
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── environments/              # API key (tidak di-commit)
└── styles.css                 # Tailwind + warna tema
```

## 🧭 Rute

| URL | Halaman |
| --- | --- |
| `/` | Beranda (mendukung `?category=`, `?q=`, `?page=`) |
| `/movie/:id` | Detail film |
| `/favorites` | Film favorit |

Contoh: `/?category=top_rated&page=3` atau `/?q=batman&page=2`.

## 📦 Build Produksi

```bash
ng build
```

Hasil build ada di folder `dist/`. Karena proyek memakai SSR, rute berparameter seperti `movie/:id` tidak bisa di-prerender tanpa daftar ID. Jika `ng build` gagal karena hal ini, ubah `renderMode` untuk rute tersebut menjadi `RenderMode.Server` di `src/app/app.routes.server.ts`.

## 🩺 Pemecahan Masalah

| Masalah | Kemungkinan penyebab |
| --- | --- |
| Pesan "API key TMDB ditolak" | API key salah, atau yang dipakai bukan **API Key (v3 auth)** |
| Tampilan polos tanpa gaya | Tailwind belum aktif, cek `.postcssrc.json` dan `@import "tailwindcss";` di `styles.css` |
| Error `Cannot find module '.../environments/environment'` | File environment belum dibuat |
| Halaman kosong setelah mengedit template | Periksa kurung kurawal `@if` / `@for` dan pesan error di Console (F12) |

## 📄 Atribusi

Produk ini memakai API TMDB tetapi tidak didukung atau disertifikasi oleh TMDB. Seluruh data film dan gambar berasal dari [The Movie Database (TMDB)](https://www.themoviedb.org).
