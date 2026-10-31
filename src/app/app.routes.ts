import { Routes } from '@angular/router';
import { FavoriteList } from './pages/favorite-list/favorite-list';
import { Home } from './pages/home/home';
import { MovieDetail } from './pages/movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetail },
  { path: 'favorites', component: FavoriteList },
];
