import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { DataService } from './services';

@Component({
  standalone: true,
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  providers: [DataService],
})
export class PhotosComponent implements OnInit {
  #dataService: DataService = inject(DataService);

  public photos$ = this.#dataService.data$;

  public ngOnInit(): void {
    this.#dataService.loadData();
  }
}
