import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-favorities',
  templateUrl: './favorities.component.html',
  styleUrl: './favorities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritiesComponent {}
