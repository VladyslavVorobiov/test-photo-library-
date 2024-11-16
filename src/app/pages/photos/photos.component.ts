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
  #dataService: DataService = inject(DataService);
  #loaderService = inject(LoaderService);

  public photos$ = this.#dataService.data$;
  public loading$ = this.#loaderService.loading$;

  public ngOnInit(): void {
    this.#dataService.loadData();
  }
}
