import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ChapterTitleService } from './core/services/chapter-title';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  // Each test settles the fixture before asserting. Clarity directives set up
  // subscriptions during initialisation, and tearing down a fixture that never
  // ran change detection throws from their ngOnDestroy.
  it('should create the app', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets the chapter title on the service', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const chapterTitle = TestBed.inject(ChapterTitleService);

    expect(chapterTitle.title()).toBe('Chapter 2: IssueTracker Lite');
  });

  it('should render the chapter title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('chapter-title .title');
    expect(title?.textContent).toContain('Chapter 2: IssueTracker Lite');
  });
});
