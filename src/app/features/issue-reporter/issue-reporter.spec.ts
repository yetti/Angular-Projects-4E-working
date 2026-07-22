import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueReporter } from './issue-reporter';
import { Issues } from '../../core/services/issues';

const VALID_ISSUE = {
  title: 'Test issue',
  description: 'A description',
  priority: 'low',
  type: 'Bug',
};

describe('IssueReporter', () => {
  let component: IssueReporter;
  let fixture: ComponentFixture<IssueReporter>;
  let issues: Issues;

  /** Submits via the real button so Clarity's submit listener runs, as in the browser. */
  async function submit() {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueReporter],
    }).compileComponents();

    issues = TestBed.inject(Issues);
    fixture = TestBed.createComponent(IssueReporter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invokes create() once per submit button click', async () => {
    component.form.setValue(VALID_ISSUE);
    await fixture.whenStable();

    const spy = vi.spyOn(component, 'create');
    await submit();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  // Clarity does not render <clr-control-error> content under jsdom -- the text is
  // absent whether the form is valid or not -- so the error messages cannot be
  // asserted on directly here. The tests below assert on `touched` instead, which
  // is sound because Clarity's own condition is
  //   showInvalid = touched && state === INVALID && errorMessagePresent
  // and `touched` is the only term of the three that this component controls.
  // The rendered behaviour still needs checking in a real browser.
  it('marks the controls touched when an incomplete form is submitted', async () => {
    // Nothing filled in, and the button is deliberately not disabled so the user
    // can submit and be told what is missing.
    await submit();

    expect(component.form.get('title')?.touched).toBe(true);
  });

  it('does not add an issue when the form is incomplete', async () => {
    const before = issues.issues().length;

    await submit();

    expect(issues.issues().length).toBe(before);
  });

  it('adds the issue when a complete form is submitted', async () => {
    const before = issues.issues().length;
    component.form.setValue(VALID_ISSUE);
    await fixture.whenStable();

    await submit();

    expect(issues.issues().length).toBe(before + 1);
    expect(issues.issues().at(-1)).toMatchObject({ title: 'Test issue', type: 'Bug' });
  });

  it('clears the form after a successful submit', async () => {
    component.form.setValue(VALID_ISSUE);
    await fixture.whenStable();

    await submit();

    expect(component.form.value.title).toBeFalsy();
  });

  it('leaves the controls untouched after a successful submit', async () => {
    component.form.setValue(VALID_ISSUE);
    await fixture.whenStable();

    await submit();

    // The emptied form is invalid again, which is fine. What must not happen is
    // the controls staying touched, because that is what makes Clarity render
    // "... is required" on a form the user just cleared.
    expect(component.form.get('title')?.touched).toBe(false);
    expect(component.form.get('priority')?.touched).toBe(false);
    expect(component.form.get('type')?.touched).toBe(false);
  });
});
