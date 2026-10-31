import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    switch (error.status) {
      case 0:
        return 'Tidak bisa terhubung ke server. Periksa koneksi internetmu lalu coba lagi.';
      case 401:
        return 'API key TMDB ditolak. Periksa kembali API key di file environment.';
      case 404:
        return 'Data yang kamu cari tidak ditemukan.';
      case 429:
        return 'Terlalu banyak permintaan dalam waktu singkat. Tunggu sebentar lalu coba lagi.';
    }

    if (error.status >= 500) {
      return 'Server TMDB sedang bermasalah. Coba lagi beberapa saat lagi.';
    }
  }

  return 'Terjadi kesalahan yang tidak terduga. Coba lagi.';
}
