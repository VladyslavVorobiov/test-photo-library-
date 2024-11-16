import { Routes } from '@angular/router';
import { NavigationRoutes } from 'core-enums';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/photos/photos.component').then((c) => c.PhotosComponent),
  },
  {
    path: NavigationRoutes.Favorites,
    loadComponent: () =>
      import('./pages/favorities/favorities.component').then(
        (c) => c.FavoritiesComponent
      ),
  },
  {
    path: '',
    redirectTo: NavigationRoutes.Photos,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: NavigationRoutes.Photos,
  },
];
