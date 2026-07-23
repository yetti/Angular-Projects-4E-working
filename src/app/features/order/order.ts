import { Component, inject, viewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TableOrder } from '../../core/models/table-order';
import { menu } from '../../menu';
import { OrderItem } from '../order-item/order-item';

@Component({
  selector: 'app-order',
  imports: [MatListModule, MatButton, MatDivider, MatDialogModule, OrderItem],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order {
  data: TableOrder = inject(MAT_DIALOG_DATA);
  menu = menu;
  private readonly orderItems = viewChildren(OrderItem);
  private dialogRef = inject(MatDialogRef<Order>);

  qtyFor(name: string) {
    return this.data.items?.find((i) => i.name === name)?.qty ?? 0;
  }

  ok() {
    const items = this.orderItems()
      .filter((item) => item.qty())
      .map((i) => {
        return {
          name: i.name(),
          qty: i.qty(),
        };
      });
    this.dialogRef.close(items);
  }
}
