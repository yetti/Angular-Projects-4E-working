import { afterNextRender, Component, signal, viewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-picking',
  imports: [NgxScannerQrcodeComponent],
  templateUrl: './picking.html',
  styleUrl: './picking.scss',
})
export class Picking {
  readonly scanner = viewChild.required(
    NgxScannerQrcodeComponent
  );
  items = signal<string[]>([]);

  constructor() {
    afterNextRender(() => {
      this.scanner().start();

      this.scanner().data.subscribe(data => {
        if (data.length) {
          this.items.update(i => [...i, data[0].value]);
          this.scanner().data.next([]);
        }
      });
    });
  }
}
