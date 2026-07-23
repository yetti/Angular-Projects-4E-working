import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from './products';

export const productResolver: ResolveFn<Product> = (route) => {
  const id = Number(route.paramMap.get('id'));
  return inject(ProductsService).getSingle(id);
};
