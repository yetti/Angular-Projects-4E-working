import { TestBed } from '@angular/core/testing';

import { Issues } from './issues';

describe('Issues', () => {
  let service: Issues;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Issues);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('appends the created issue and assigns the next issue number', async () => {
    const before = service.issues().length;

    const created = await service.create({
      title: 'New issue',
      description: 'Details',
      priority: 'low',
      type: 'Bug',
      completed: false,
    });

    expect(created.issueNo).toBe(before + 1);
    expect(service.issues().length).toBe(before + 1);
    expect(service.issues().at(-1)).toEqual(created);
  });

  it('does not mutate the issue passed in by the caller', async () => {
    const input = {
      title: 'New issue',
      description: 'Details',
      priority: 'low' as const,
      type: 'Bug' as const,
      completed: false,
    };

    await service.create(input);

    expect(input).not.toHaveProperty('issueNo');
  });
});
