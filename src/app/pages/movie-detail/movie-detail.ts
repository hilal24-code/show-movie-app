import { Location } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorMessage } from '../../components/error-message/error-message';
import { MovieDetailData } from '../../models/movie.model';
import { Favorites } from '../../services/favorites';
import { Tmdb } from '../../services/tmdb';
import { getErrorMessage } from '../../utils/http-error';

@Component({
  selector: 'app-movie-detail',
  imports: [ErrorMessage],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private tmdb = inject(Tmdb);
  private sanitizer = inject(DomSanitizer);
  fav = inject(Favorites);

  movie = signal<MovieDetailData | null>(null);
  error = signal<string | null>(null);
  imageUrl = environment.tmdbImageUrl;

  trailerUrl = computed<SafeResourceUrl | null>(() => {
    const videos = this.movie()?.videos?.results ?? [];
    const trailers = videos.filter((v) => v.site === 'YouTube' && v.type === 'Trailer');
    const trailer = trailers.find((v) => v.official) ?? trailers[0];

    if (!trailer) return null;

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${trailer.key}`,
    );
  });

  cast = computed(() => (this.movie()?.credits?.cast ?? []).slice(0, 12));

  ngOnInit() {
    this.loadMovie();
  }

  loadMovie() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.error.set(null);

    this.tmdb.getMovieDetail(id).subscribe({
      next: (res) => this.movie.set(res),
      error: (err) => this.error.set(getErrorMessage(err)),
    });
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
