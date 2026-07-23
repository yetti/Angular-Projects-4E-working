import { Component, input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-chapter-title',
  template: `
    <mat-toolbar>
      <h1>{{ chapterTitle() }}</h1>
    </mat-toolbar>
  `,
  imports: [MatToolbar],
})
export class ChapterTitle {
  readonly chapterTitle = input<string>('');
}
