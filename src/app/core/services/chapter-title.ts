import { Service, signal } from '@angular/core';

@Service()
export class ChapterTitleService {
  readonly #title = signal('Chapter 3: EasyMenu');
  readonly title = this.#title.asReadonly();

  setTitle(newTitle: string) {
    this.#title.set(newTitle);
  }
}
