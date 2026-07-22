import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chapter-title',
  template: `<h1>{{ text() }}</h1>`,
})
export class ChapterTitle {
  readonly text = input.required<string>();
}
