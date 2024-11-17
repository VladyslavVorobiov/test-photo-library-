import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FavoritePhotoService } from 'core-api';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let favoritePhotoServiceMock: FavoritePhotoService;
  let routerMock: Router;

  const getHtmlElementDebug = (cssClass: string): DebugElement =>
    fixture.debugElement.query(By.css(cssClass));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideRouter([]),
        {
          provide: FavoritePhotoService,
          useValue: {
            getById: () => ({ id: 'mockId', url: 'mockUrl' }),
            remove: () => {},
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 'mockId' } } },
        },
        {
          provide: Router,
          useValue: { navigate: () => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    favoritePhotoServiceMock = TestBed.inject(FavoritePhotoService);
    routerMock = TestBed.inject(Router);

    fixture.detectChanges();
  });

  describe('When is initialized', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    describe('when click on remove button', () => {
      let spyOnRemove: jasmine.Spy;
      let spyOnNavigate: jasmine.Spy;

      beforeEach(() => {
        spyOnRemove = spyOn(favoritePhotoServiceMock, 'remove');
        spyOnNavigate = spyOn(routerMock, 'navigate');

        const removeButton = getHtmlElementDebug('.actions button');
        removeButton.triggerEventHandler('click');

        fixture.detectChanges();
      });

      it('should call remove logic', () => {
        expect(spyOnRemove).toHaveBeenCalled();
      });

      it('should call navigate logic', () => {
        expect(spyOnNavigate).toHaveBeenCalled();
      });
    });
  });
});
