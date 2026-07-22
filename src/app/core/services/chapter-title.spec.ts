import { TestBed } from '@angular/core/testing';

import { ChapterTitleService } from './chapter-title';

describe('ChapterTitleService', () => {
  let service: ChapterTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('exposes the chapter title', () => {
    expect(service.title()).toBe('Chapter 3: EasyMenu');
  });
});
