import { Service, signal } from '@angular/core';

@Service()
export class ChapterTitleService {
  readonly title = signal('Chapter 1: Angular AI Kick-Starter');
}
