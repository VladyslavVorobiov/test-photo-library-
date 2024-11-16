import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderService } from 'core-services';
import { DataService } from './services';

@Component({
  standalone: true,
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatProgressSpinnerModule],
  providers: [DataService],
})
export class PhotosComponent implements OnInit {
  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const photosElement = event.target as HTMLElement;
    const scrollPosition = photosElement.scrollTop + photosElement.clientHeight;

    if (scrollPosition >= photosElement.scrollHeight) {
      this.#dataService.loadData();
    }
  }

  #dataService: DataService = inject(DataService);
  #loaderService = inject(LoaderService);

  public photos$ = this.#dataService.data$;
  public loading$ = this.#loaderService.loading$;

  public ngOnInit(): void {
    this.#dataService.loadData();
  }
}
