import { Injectable } from '@angular/core';

const FAVORITE_PHOTOS_KEY = 'favoritePhotos';

// This is an imitation of persisting favorite photos api
@Injectable({
  providedIn: 'root',
})
export class FavoritePhotoService {
  constructor() {
    this.#initStorage();
  }

  public getList(): string[] {
    const item = localStorage.getItem(FAVORITE_PHOTOS_KEY);
    if (!item) return [];

    const array = JSON.parse(item);
    // Validate that we got an array of strings
    if (
      Array.isArray(array) &&
      array.every((item) => typeof item === 'string')
    ) {
      return array;
    }
    return [];
  }

  public save(url: string): boolean {
    const list = this.getList();

    if (list.includes(url)) return false;

    const serializedData = JSON.stringify([...list, url]);

    localStorage.setItem(FAVORITE_PHOTOS_KEY, serializedData);
    return true;
  }

  //  remove(url: string): boolean {
  //   try {
  //     const existingArray = this.getArray(key);
  //     const newArray = existingArray.filter(i => i !== item);
  //     return this.saveArray(key, newArray);
  //   } catch (error) {
  //     console.error('Error removing from array in localStorage:', error);
  //     return false;
  //   }
  // }

  #initStorage(): void {
    const storage = localStorage.getItem(FAVORITE_PHOTOS_KEY);

    if (!storage) {
      localStorage.setItem(FAVORITE_PHOTOS_KEY, '[]');
    }
  }
}
