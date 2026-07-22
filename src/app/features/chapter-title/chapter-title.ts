import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chapter-title',
  template: `<h1>{{ chapterTitle() }}</h1>`,
})
export class ChapterTitle {
  readonly chapterTitle = input<string>('');
}
