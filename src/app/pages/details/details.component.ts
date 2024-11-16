import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class DetailsComponent {}
