import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
import { Issues } from '../../core/services/issues';
import { Issue } from '../../core/models/issue';

@Component({
  selector: 'app-issue-reporter',
  imports: [ReactiveFormsModule, ClrFormsModule],
  templateUrl: './issue-reporter.html',
  styleUrl: './issue-reporter.scss',
})
export class IssueReporter {
  private issuesService: Issues = inject(Issues);

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    priority: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  async create() {
    if (this.form.invalid) {
      // Clarity's `clrForm` marks every control touched on submit, which is what
      // reveals the error messages. Nothing more to do here.
      return;
    }

    await this.issuesService.create(this.form.value as Omit<Issue, 'issueNo'>);

    // Reached after the submit event has finished dispatching, so this runs
    // after Clarity has marked the controls touched -- otherwise the reset would
    // be undone and the blank form would show "is required" on every field.
    this.form.reset();
  }
}
