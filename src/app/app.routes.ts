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
      import('./pages/favorites/favorites.component').then(
        (c) => c.FavoritesComponent
      ),
  },
  {
    // Task description says: Single photo page located at /photos/:id path
    // but it seems logical to have actual path /favorites/:id
    // because we are going to show details of a photo from favorites
    path: `${NavigationRoutes.Favorites}/:id`,
    loadComponent: () =>
      import('./pages/details/details.component').then(
        (c) => c.DetailsComponent
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
