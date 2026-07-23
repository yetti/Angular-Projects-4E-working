import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

import { App } from './app';
import { TablesService } from './core/services/tables';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: TablesService,
          useValue: { tables: signal<DocumentData[]>([]) } satisfies Pick<TablesService, 'tables'>,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the chapter title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-chapter-title h1')?.textContent).toContain(
      'Chapter 3: EasyMenu',
    );
  });
});
