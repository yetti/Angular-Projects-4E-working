import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterTitle } from './chapter-title';

describe('ChapterTitle', () => {
  let fixture: ComponentFixture<ChapterTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterTitle);
    fixture.componentRef.setInput('chapterTitle', 'Chapter 1: Angular AI Kick-Starter');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the chapter title in a heading', () => {
    const heading: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent).toContain('Chapter 1: Angular AI Kick-Starter');
  });
});
