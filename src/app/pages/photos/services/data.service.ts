import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, take, tap } from 'rxjs';

import { PhotoLoaderService } from 'core-api';
import { LoaderService } from 'core-services';
import { PhotoItem } from '../models';

@Injectable()
export class DataService {
  #photoLoaderService: PhotoLoaderService = inject(PhotoLoaderService);
  #loaderService = inject(LoaderService);

  #dataSubject = new BehaviorSubject<PhotoItem[]>([]);
  public data$ = this.#dataSubject.asObservable();

  public loadData(): void {
    this.#loaderService.setLoader(true);

    this.#photoLoaderService
      .loadPhotos()
      .pipe(
        take(1),
        tap((result) => {
          const data = result.map((url) => ({ url }));

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
}
