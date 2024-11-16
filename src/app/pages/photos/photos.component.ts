import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderService } from 'core-services';
import { DataService } from './services';
import { PhotoItem } from './models';

@Component({
  standalone: true,
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatProgressSpinnerModule],
  providers: [DataService],
  // We can achieve same with @HostListener('scroll', ['$event'])
  // But Angular doc says: Always prefer using the host property over @HostBinding and @HostListener.
  // These decorators exist exclusively for backwards compatibility.
  host: {
    '(scroll)': 'onScroll($event)',
  },
})
export class PhotosComponent implements OnInit {
  #dataService: DataService = inject(DataService);
  #loaderService = inject(LoaderService);

  public photos$ = this.#dataService.data$;
  public loading$ = this.#loaderService.loading$;

  public ngOnInit(): void {
    this.#dataService.loadData();
  }

  public onPhotoClick(photo: PhotoItem): void {
    this.#dataService.saveToFavorite(photo);
  }

  public onScroll(event: Event): void {
    const photosElement = event.target as HTMLElement;
    const scrollPosition = photosElement.scrollTop + photosElement.clientHeight;

    if (scrollPosition >= photosElement.scrollHeight) {
      this.#dataService.loadData();
    }
  }
}
