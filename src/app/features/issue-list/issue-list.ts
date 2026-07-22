import { Component, computed, inject, signal } from '@angular/core';
import { Issues } from '../../core/services/issues';
import { Issue } from '../../core/models/issue';
import { Confirm } from '../confirm/confirm';

import { ClrDatagridModule } from '@clr/angular';

@Component({
  selector: 'app-issue-list',
  imports: [ClrDatagridModule, Confirm],
  templateUrl: './issue-list.html',
  styleUrl: './issue-list.scss',
})
export class IssueList {
  private issuesService: Issues = inject(Issues);
  readonly selected = signal<number | undefined>(undefined);

  protected readonly issues = computed(() => {
    const data = this.issuesService.issues();
    return data.filter((i: Issue) => !i.completed);
  })

  complete(confirmed: boolean | void) {
    if (confirmed) {
      this.issuesService.resolve(this.selected());
    }
    this.selected.set(undefined);
  }
}
