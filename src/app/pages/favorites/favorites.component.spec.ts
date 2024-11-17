import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { PhotoItem } from 'core-api';
import { FavoritesComponent } from './favorites.component';
import { DataService } from './services';

const MOCK_PHOTOS: PhotoItem[] = [
  { id: 'mockId1', url: 'mockUrl1' },
  { id: 'mockId2', url: 'mockUrl2' },
];

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const getHtmlElementsDebug = (cssClass: string): DebugElement[] =>
    fixture.debugElement.queryAll(By.css(cssClass));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, AsyncPipe],
      providers: [
        {
          provide: Router,
          useValue: { navigate: () => {} },
        },
      ],
    })
      .overrideProvider(DataService, {
        useValue: {
          data$: of(MOCK_PHOTOS),
          loadData: () => {},
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('When is initialized', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should render proper amount of photos', () => {
      const photos = getHtmlElementsDebug('.image-item');

      expect(photos.length).toBe(MOCK_PHOTOS.length);
    });
  });
});
