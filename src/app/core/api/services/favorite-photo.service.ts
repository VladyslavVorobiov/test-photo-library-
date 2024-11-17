import { Injectable } from '@angular/core';
import { PhotoItem } from '../models';

const FAVORITE_PHOTOS_KEY = 'favoritePhotos';

// This is an imitation of persisting favorite photos api
@Injectable({
  providedIn: 'root',
})
export class FavoritePhotoService {
  constructor() {
    this.#initStorage();
  }

  public getList(): PhotoItem[] {
    const list = localStorage.getItem(FAVORITE_PHOTOS_KEY);
    if (!list) return [];

    return JSON.parse(list) as PhotoItem[];
  }

  public getById(id: string): PhotoItem | undefined {
    const list = this.getList();

    return list.find((item) => item.id === id);
  }

  public save(photo: PhotoItem): boolean {
    const list = this.getList();

    if (list.some((item) => item.id === photo.id)) return false;

    const serializedData = JSON.stringify([...list, photo]);

    localStorage.setItem(FAVORITE_PHOTOS_KEY, serializedData);
    return true;
  }

  public remove(id: string): void {
    const list = this.getList();

    const newList = list.filter((item) => item.id !== id);

    const serializedData = JSON.stringify([...newList]);

    localStorage.setItem(FAVORITE_PHOTOS_KEY, serializedData);
  }

  #initStorage(): void {
    const storage = localStorage.getItem(FAVORITE_PHOTOS_KEY);

    if (!storage) {
      localStorage.setItem(FAVORITE_PHOTOS_KEY, '[]');
    }
  }
}
