import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavigationItem } from './models';
import { NAVIGATION_ITEMS } from './constants/navigation-items.constant';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [RouterLink, RouterLinkActive],
})
export class NavigationComponent {
  public navigationItems: NavigationItem[] = NAVIGATION_ITEMS;
}
