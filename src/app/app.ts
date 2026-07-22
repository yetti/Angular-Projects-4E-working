import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChapterTitleService } from './core/services/chapter-title';
import { ChapterTitle } from './features/chapter-title/chapter-title';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChapterTitle],
  imports: [RouterOutlet, ChapterTitle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly chapterTitle = inject(ChapterTitleService).title;
}
