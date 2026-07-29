/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * jsdom does not implement ResizeObserver, but several Clarity components
 * (datagrid, modal, nav) construct one on instantiation and throw without it.
 * A no-op stub is enough: the tests assert on rendered markup and form state,
 * not on layout measurements.
 */
class ResizeObserverStub implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

/** Same story for IntersectionObserver, which the Clarity datagrid needs. */
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: readonly number[] = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.ResizeObserver ??= ResizeObserverStub;
globalThis.IntersectionObserver ??= IntersectionObserverStub;
