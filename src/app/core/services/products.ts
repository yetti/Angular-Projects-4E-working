import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from '../models/product';

@Service()
export class ProductsService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getSingle(id: number) {
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id);
  }
}
