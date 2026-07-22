import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { TablesService } from '../../core/services/tables';

@Component({
  selector: 'app-table-list',
  imports: [MatGridListModule, MatCardModule],
  templateUrl: './table-list.html',
  styleUrl: './table-list.scss',
})
export class TableList {
  private readonly tablesService = inject(TablesService);

  readonly tables = this.tablesService.tables;
}

