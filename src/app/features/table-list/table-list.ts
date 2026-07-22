import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { TablesService } from '../../core/services/tables';
import { Order } from '../order/order';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-table-list',
  imports: [MatGridListModule, MatCardModule, MatListModule],
  templateUrl: './table-list.html',
  styleUrl: './table-list.scss',
})
export class TableList {
  private readonly tablesService = inject(TablesService);
  readonly tables = this.tablesService.tables;
  private dialog = inject(MatDialog);

  select(no: number) {
    this.dialog.open(Order, {
      width: '500px',
      data: no,
    }).afterClosed().subscribe(async items => {
      if (items) {
        await this.tablesService.updateTable(no, {items});
      }
    });
  }
}

