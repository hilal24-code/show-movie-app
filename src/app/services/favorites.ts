import { afterNextRender, computed, Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie.model';

const STORAGE_KEY = 'show-movie-app:favorites';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  favorites = signal<Movie[]>([]);
  count = computed(() => this.favorites().length);

  constructor() {
    // Hanya jalan di browser, setelah render pertama selesai
    afterNextRender(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) this.favorites.set(JSON.parse(raw));
      } catch {
        this.favorites.set([]);
      }
    });
  }

  isFavorite(id: number): boolean {
    return this.favorites().some((m) => m.id === id);
  }

  toggle(movie: Movie) {
    const updated = this.isFavorite(movie.id)
      ? this.favorites().filter((m) => m.id !== movie.id)
      : [
          {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          },
          ...this.favorites(),
        ];

    this.favorites.set(updated);
    this.save(updated);
  }

  private save(list: Movie[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // penyimpanan penuh atau diblokir, abaikan saja
    }
  }
}
