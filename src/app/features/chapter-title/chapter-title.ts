import { Component, input } from '@angular/core';
import { ClrNavigationModule } from '@clr/angular';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'chapter-title',
  imports: [ClrNavigationModule],
  template: `<clr-header>
    <div class="branding">
      <a href="javascript://" class="nav-link">
        <span class="title">{{ chapterTitle() }}</span>
      </a>
    </div>
  </clr-header>`,
})
export class ChapterTitle {
  readonly chapterTitle = input<string>('');
}
