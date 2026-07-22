import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

import { TableList } from './table-list';
import { TablesService } from '../../core/services/tables';

describe('TableList', () => {
  let fixture: ComponentFixture<TableList>;
  let tables: WritableSignal<DocumentData[]>;

  beforeEach(async () => {
    tables = signal<DocumentData[]>([]);

    await TestBed.configureTestingModule({
      imports: [TableList],
      providers: [
        {
          provide: TablesService,
          useValue: { tables } satisfies Pick<TablesService, 'tables'>,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableList);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders no cards when there are no tables', () => {
    expect(fixture.nativeElement.querySelectorAll('mat-card').length).toBe(0);
  });

  it('renders a card per table, numbered from one', async () => {
    tables.set([{ seats: 2 }, { seats: 4 }, { seats: 6 }]);
    await fixture.whenStable();

    const titles: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('mat-card-title');

    expect(titles.length).toBe(3);
    expect(titles[0].textContent).toContain('# 1');
    expect(titles[2].textContent).toContain('# 3');
  });
});
