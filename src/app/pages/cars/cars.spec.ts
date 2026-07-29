import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cars } from './cars';

/** Minimal stand-in for the Google Maps classes the template constructs. */
class FakeMapsObject {
  addListener = () => ({ remove: () => undefined });
  setOptions = () => undefined;
  close = () => undefined;
}

interface TestingWindow extends Window {
  google?: unknown;
}

describe('Cars', () => {
  let component: Cars;
  let fixture: ComponentFixture<Cars>;

  beforeEach(async () => {
    // The Maps JS API is loaded by a script tag in index.html, which jsdom never runs.
    (window as TestingWindow).google = {
      maps: {
        Map: FakeMapsObject,
        InfoWindow: FakeMapsObject,
        marker: { AdvancedMarkerElement: FakeMapsObject },
      },
    };

    await TestBed.configureTestingModule({
      imports: [Cars],
    }).compileComponents();

    fixture = TestBed.createComponent(Cars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    (window as TestingWindow).google = undefined;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
