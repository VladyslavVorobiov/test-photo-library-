import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, finalize, take, tap } from 'rxjs';

import { FavoritePhotoService, PhotoItem, PhotoLoaderService } from 'core-api';
import { LoaderService } from 'core-services';

@Injectable()
export class DataService {
  #photoLoaderService: PhotoLoaderService = inject(PhotoLoaderService);
  #favoritePhotoService: FavoritePhotoService = inject(FavoritePhotoService);
  #loaderService = inject(LoaderService);
  #snackBar = inject(MatSnackBar);

  #dataSubject = new BehaviorSubject<PhotoItem[]>([]);
  public data$ = this.#dataSubject.asObservable();

  public loadData(): void {
    this.#loaderService.setLoader(true);

    this.#photoLoaderService
      .loadPhotos()
      .pipe(
        take(1),
        tap((result) => {
          const data = result.map((url) => ({ id: this.#generateId(), url }));

          this.#dataSubject.next([...this.#dataSubject.value, ...data]);
        }),
        // Could be an error handler for real api
        // catchError((error) => {
        //   console.error('Error loading photos', error);
        //   this.#dataSubject.next([]);
        // })
        finalize(() => this.#loaderService.setLoader(false))
      )
      .subscribe();
  }

  public saveToFavorite(photo: PhotoItem): void {
    const result = this.#favoritePhotoService.save(photo);

    const message = result
      ? 'Photo saved to favorite'
      : 'Photo already in favorite';

    this.#snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  #generateId(): string {
    return Math.random().toString(36).slice(2);
  }
}
