import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieCategory, MovieDetailData, MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class Tmdb {
  private http = inject(HttpClient);

    getPopularMovies(page = 1): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${environment.tmdbBaseUrl}/movie/popular`, {
        params: {
            api_key: environment.tmdbApiKey,
            language: 'en-US',
            page,
        },
        });
    }
    getMovieDetail(id: number): Observable<MovieDetailData> {
        return this.http.get<MovieDetailData>(
        `${environment.tmdbBaseUrl}/movie/${id}`,
        {
            params: {
            api_key: environment.tmdbApiKey,
            language: 'en-US',
            append_to_response: 'videos,credits',
            },
        },
        );
    }
    searchMovies(query: string, page = 1): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(
        `${environment.tmdbBaseUrl}/search/movie`,
        {
            params: {
            api_key: environment.tmdbApiKey,
            language: 'en-US',
            query,
            page,
            },
        },
        );
    }
    getMovies(category: MovieCategory, page = 1): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(
        `${environment.tmdbBaseUrl}/movie/${category}`,
        {
            params: {
            api_key: environment.tmdbApiKey,
            language: 'en-US',
            page,
            },
        },
        );
    }
}
