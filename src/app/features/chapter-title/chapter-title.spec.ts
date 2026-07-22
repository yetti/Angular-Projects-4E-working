import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClrLayoutModule } from '@clr/angular';

import { ChapterTitle } from './chapter-title';

/**
 * ChapterTitle renders a <clr-header>, and Clarity throws if that is not nested
 * inside a <clr-main-container>. So the component is exercised through a host
 * that supplies the required container, the same way App does.
 */
@Component({
  imports: [ChapterTitle, ClrLayoutModule],
  template: `<clr-main-container>
    <chapter-title [chapterTitle]="title()" />
  </clr-main-container>`,
})
class TestHost {
  // A signal, not a plain field: the app is zoneless, so a plain assignment
  // would not schedule change detection and the update assertion would be
  // vacuously comparing against stale markup.
  readonly title = signal('Chapter 1: Angular AI Kick-Starter');
}

describe('ChapterTitle', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the chapter title', () => {
    const title = fixture.nativeElement.querySelector('chapter-title .title');
    expect(title?.textContent).toContain('Chapter 1: Angular AI Kick-Starter');
  });

  it('reflects a changed title', async () => {
    fixture.componentInstance.title.set('Chapter 2: IssueTracker Lite');
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('chapter-title .title');
    expect(title?.textContent).toContain('Chapter 2: IssueTracker Lite');
  });
});
