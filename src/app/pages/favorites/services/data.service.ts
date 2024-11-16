import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FavoritePhotoService, PhotoItem } from 'core-api';

@Injectable()
export class DataService {
  #favoritePhotoService: FavoritePhotoService = inject(FavoritePhotoService);

  #dataSubject = new BehaviorSubject<PhotoItem[]>([]);
  public data$ = this.#dataSubject.asObservable();

  public loadData(): void {
    const list = this.#favoritePhotoService.getList();

    this.#dataSubject.next(list.map((url) => ({ url })));
  }
}
