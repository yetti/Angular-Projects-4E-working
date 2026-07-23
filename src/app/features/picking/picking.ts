import { afterNextRender, Component, inject, signal, viewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, LOAD_WASM } from 'ngx-scanner-qrcode';
import { ProductsService } from '../../core/services/products';
import { Product } from '../../core/models/product';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-picking',
  imports: [NgxScannerQrcodeComponent],
  templateUrl: './picking.html',
  styleUrl: './picking.scss',
})
export class Picking {
  private productsService = inject(ProductsService);

  readonly scanner = viewChild.required(
    NgxScannerQrcodeComponent
  );
  items = signal<string[]>([]);
  total = signal<number>(0);

  constructor() {
    afterNextRender(() => {
      this.scanner().start();

      this.scanner().data.subscribe(data => {
        if (data.length) {
          this.getProduct(data[0].value);
        }
      });
    });
  }

  private getProduct(code: string) {
    const id = code.substring(code.lastIndexOf('/') + 1);
    this.productsService.getSingle(Number(id)).subscribe(p => {
      if (!this.items().includes(p.title)) {
        this.items.update((i) => [...i, p.title]);
        this.total.update((i) => i += p.price * 100);
        this.scanner().data.next([]);
      }
    });
  }
}
