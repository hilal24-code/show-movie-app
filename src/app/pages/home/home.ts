import { ErrorMessage } from '../../components/error-message/error-message';
import { getErrorMessage } from '../../utils/http-error';
import { Favorites } from '../../services/favorites';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Movie, MovieCategory } from '../../models/movie.model';
import { Tmdb } from '../../services/tmdb';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ErrorMessage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private tmdb = inject(Tmdb);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  fav = inject(Favorites);

  categories: { key: MovieCategory; label: string }[] = [
    { key: 'popular', label: 'Populer' },
    { key: 'top_rated', label: 'Rating Tertinggi' },
    { key: 'now_playing', label: 'Sedang Tayang' },
    { key: 'upcoming', label: 'Akan Tayang' },
  ];

  movies = signal<Movie[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  category = signal<MovieCategory>('popular');
  query = signal('');
  page = signal(1);
  totalPages = signal(1);
  imageUrl = environment.tmdbImageUrl;
  skeletons = Array.from({ length: 20 });

  heading = computed(() => {
    if (this.query()) {
      return `Hasil pencarian: "${this.query()}"`;
    }
    return this.categories.find((c) => c.key === this.category())!.label;
  });

  ngOnInit() {
    // Setiap kali URL berubah, baca parameternya lalu muat film
    this.route.queryParamMap.subscribe((params) => {
      const cat = params.get('category');
      const validCategory = this.categories.some((c) => c.key === cat);

      this.category.set(validCategory ? (cat as MovieCategory) : 'popular');
      this.query.set(params.get('q') ?? '');
      this.page.set(Number(params.get('page')) || 1);

      this.loadMovies();
    });
  }

  loadMovies() {
    this.loading.set(true);
    this.error.set(null);

    const request = this.query()
      ? this.tmdb.searchMovies(this.query(), this.page())
      : this.tmdb.getMovies(this.category(), this.page());

    request.subscribe({
      next: (res) => {
        this.movies.set(res.results);
        this.totalPages.set(Math.min(res.total_pages, 500));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(getErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  selectCategory(category: MovieCategory) {
    this.router.navigate([], {
      queryParams: { category, q: null, page: null },
      queryParamsHandling: 'merge',
    });
  }

  search(text: string) {
    this.router.navigate([], {
      queryParams: { q: text.trim() || null, page: null },
      queryParamsHandling: 'merge',
    });
  }

  goToPage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages()) return;
    this.router.navigate([], {
      queryParams: { page: newPage === 1 ? null : newPage },
      queryParamsHandling: 'merge',
    });
  }
}
