import { NavigationRoutes } from 'core-enums';
import { NavigationItem } from '../models';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Photos',
    route: '/',
  },
  {
    title: 'Favorites',
    route: `/${NavigationRoutes.Favorites}`,
  },
];
