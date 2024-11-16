import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { PhotoItem } from 'core-api';
import { DataService } from './services';

@Component({
  standalone: true,
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  providers: [DataService],
})
export class FavoritesComponent implements OnInit {
  #dataService: DataService = inject(DataService);
  public photos$ = this.#dataService.data$;

  public ngOnInit(): void {
    this.#dataService.loadData();
  }

  public onPhotoClick(photo: PhotoItem): void {}
}
