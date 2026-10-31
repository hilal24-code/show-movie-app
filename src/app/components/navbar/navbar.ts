import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  fav = inject(Favorites);
}
