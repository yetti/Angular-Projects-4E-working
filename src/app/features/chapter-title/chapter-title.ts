import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClrNavigationModule } from '@clr/angular';

@Component({
  selector: 'chapter-title',
  imports: [ClrNavigationModule],
  template: `<clr-header>
    <div class="branding">
      <a href="javascript://" class="nav-link">
        <span class="title">{{ chapterTitle() }}</span>
      </a>
    </div>
  </clr-header>`
})
export class ChapterTitle {
  readonly chapterTitle = input<string>('');
}
