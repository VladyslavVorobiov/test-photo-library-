import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  #loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.#loadingSubject.asObservable();

  public setLoader(loading: boolean): void {
    this.#loadingSubject.next(loading);
  }
}
