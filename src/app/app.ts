import { Component, inject } from '@angular/core';
import { ChapterTitleService } from './core/services/chapter-title';
import { ChapterTitle } from './features/chapter-title/chapter-title';
import { TableList } from './features/table-list/table-list';

@Component({
  selector: 'app-root',
  imports: [ChapterTitle, TableList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly chapterTitleService = inject(ChapterTitleService);
  protected readonly title = this.chapterTitleService.title;
}
