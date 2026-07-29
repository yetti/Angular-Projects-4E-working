import { Service, signal } from '@angular/core';

@Service()
export class ChapterTitleService {
  readonly #title = signal('Chapter 1: Angular AI Kick-Starter');
  readonly title = this.#title.asReadonly();

  setTitle(newTitle: string) {
    this.#title.set(newTitle);
  }
}
