import { Service, signal } from '@angular/core';

@Service()
export class ChapterTitleService {
  private readonly _title = signal('Chapter 1: Angular AI Kick-Starter');
  readonly title = this._title;

  setTitle(newTitle: string): void {
    this._title.set(newTitle);
  }
}
