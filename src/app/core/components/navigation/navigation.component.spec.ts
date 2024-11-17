import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Type } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { NavigationComponent } from './navigation.component';

// This approach with HostComponent is useful when
// we want to test a component that is used in another component
// we want to test a component's inputs and outputs
// we want to test a component's public properties and methods
@Component({
  standalone: true,
  template: `<app-navigation />`,
  imports: [NavigationComponent],
})
class TestHostComponent {}

describe('NavigationComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let navigationComponent: NavigationComponent;

  const getComponentDebug = (type: Type<unknown>): DebugElement =>
    fixture.debugElement.query(By.directive(type));

  const getHtmlElementsDebug = (cssClass: string): DebugElement[] =>
    fixture.debugElement.queryAll(By.css(cssClass));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    navigationComponent =
      getComponentDebug(NavigationComponent).componentInstance;
  });

  describe('When is initialized', () => {
    it('should create component', () => {
      expect(navigationComponent).toBeTruthy();
    });

    it('should render proper amount of navigation links', () => {
      const navigationLinks = getHtmlElementsDebug('.navigation-link');

      expect(navigationLinks.length).toBe(
        navigationComponent.navigationItems.length
      );
    });
  });
});
