import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products';
import { toSignal } from '@angular/core/rxjs-interop';
import { SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [SlicePipe, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productsService: ProductsService = inject(ProductsService);
  products = toSignal(this.productsService.getAll());
}
