import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { FavoritePhotoService, PhotoItem } from 'core-api';
import { NavigationRoutes } from 'core-enums';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class DetailsComponent implements OnInit {
  #favoritePhotoService: FavoritePhotoService = inject(FavoritePhotoService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #router: Router = inject(Router);

  #id: string = this.#activatedRoute.snapshot.params['id'];

  public photo: PhotoItem | undefined;

  public ngOnInit(): void {
    this.photo = this.#favoritePhotoService.getById(this.#id);
  }

  public onRemove(): void {
    this.#favoritePhotoService.remove(this.#id);
    this.#router.navigate([NavigationRoutes.Favorites]);
  }
}
