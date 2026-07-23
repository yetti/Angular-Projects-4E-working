import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChapterTitleService } from './core/services/chapter-title';
import { ChapterTitle } from './features/chapter-title/chapter-title';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChapterTitle, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly chapterTitleService = inject(ChapterTitleService);
  protected readonly title = this.chapterTitleService.title;

  constructor() {
    this.chapterTitleService.setTitle(
      'Chapter 4: SmartFactory Picker'
    )
  }
}
