import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { TablesService } from '../../core/services/tables';
import { Order } from '../order/order';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Item } from '../../core/models/item';
import { TableOrder } from '../../core/models/table-order';

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
    this.dialog
      .open<Order, TableOrder, Item[]>(Order, {
        width: '500px',
        data: { no: no, items: this.tables()[no - 1]['items'] },
      })
      .afterClosed()
      .subscribe(async (items) => {
        if (items) {
          await this.tablesService.updateTable(no, { items });
        }
      });
  }
}

