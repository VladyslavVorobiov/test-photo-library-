import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from 'core-components';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NavigationComponent],
})
export class AppComponent {}
