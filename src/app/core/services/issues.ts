import { Service, signal } from '@angular/core';
import { Issue } from '../models/issue';
import { issueData } from '../../../../public/mock-issues';

@Service()
export class Issues {
  readonly issues = signal<Issue[]>(issueData);

  /**
   * Async so callers await the write, matching the shape this will take when it
   * becomes a real HTTP call. Returns the stored issue, the way a POST would.
   */
  async create(issue: Omit<Issue, 'issueNo'>): Promise<Issue> {
    const created: Issue = { ...issue, issueNo: this.issues().length + 1 };
    this.issues.update((issues) => [...issues, created]);
    return created;
  }

  resolve(issueNo: number | undefined) {
    const i = this.issues().findIndex((i) => i.issueNo === issueNo);
    this.issues.update((issues) => {
      issues[i].completed = true;
      return [...issues];
    });
  }
}
