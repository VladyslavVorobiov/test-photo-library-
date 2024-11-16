import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';

import { PhotoLoaderService } from 'core-api';
import { PhotoItem } from '../models';

@Injectable()
export class DataService {
  #photoLoaderService: PhotoLoaderService = inject(PhotoLoaderService);

  #dataSubject = new BehaviorSubject<PhotoItem[]>([]);
  public data$ = this.#dataSubject.asObservable();

  public loadData(): void {
    this.#photoLoaderService
      .loadPhotos()
      .pipe(
        take(1),
        tap((result) => {
          const data = result.map((url) => ({ id: url, url }));

          this.#dataSubject.next([...this.#dataSubject.value, ...data]);
        })
        // Could be an error handler for real api
        // catchError((error) => {
        //   console.error('Error loading photos', error);
        //   this.#dataSubject.next([]);
        // })
      )
      .subscribe();
  }
}
