import { Component, inject } from '@angular/core';
import { ClrLayoutModule } from '@clr/angular';
import { ChapterTitleService } from './core/services/chapter-title';
import { ChapterTitle } from './features/chapter-title/chapter-title';
import { IssueList } from './features/issue-list/issue-list';
import { IssueReporter } from './features/issue-reporter/issue-reporter';

@Component({
  selector: 'app-root',
  imports: [ChapterTitle, ClrLayoutModule, IssueList, IssueReporter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly chapterTitleService = inject(ChapterTitleService);
  protected readonly title = this.chapterTitleService.title;

  constructor() {
    this.chapterTitleService.setTitle('Chapter 2: IssueTracker Lite');
  }
}
