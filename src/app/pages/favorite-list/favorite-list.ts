import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-favorite-list',
  imports: [RouterLink],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.css',
})
export class FavoriteList {
  fav = inject(Favorites);
  imageUrl = environment.tmdbImageUrl;
}
