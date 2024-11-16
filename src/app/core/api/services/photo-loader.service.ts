import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

const OFFSET = 12;

@Injectable({
  providedIn: 'root',
})
export class PhotoLoaderService {
  // Imitate loading photos api with offset for infinite scroll
  public loadPhotos(): Observable<string[]> {
    const fetchUrls = Array(OFFSET)
      .fill(1)
      .map(() => fetch('https://random.imagecdn.app/500/500'));

    const promiseUrls = Promise.allSettled(fetchUrls).then((results) =>
      results.map((result) =>
        result.status === 'rejected' ? '' : result.value.url
      )
    );

    return from(promiseUrls);
  }
}
