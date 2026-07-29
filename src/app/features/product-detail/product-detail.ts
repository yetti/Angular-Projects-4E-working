import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  product = signal<Product>(inject(ActivatedRoute).snapshot.data['product']);
}
