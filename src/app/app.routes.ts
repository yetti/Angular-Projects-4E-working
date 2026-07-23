import { Routes } from '@angular/router';
import { ProductList } from './features/product-list/product-list';
import { ProductDetail } from './features/product-detail/product-detail';
import { productResolver } from './core/services/product-resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProductList,
  }, {
    path: ':id',
    component: ProductDetail,
    resolve: {
      product: productResolver
    }
  }
];
