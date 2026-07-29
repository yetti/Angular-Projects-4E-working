import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product';
import { ProductDetail } from './product-detail';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;
  const fakeProduct: Product = {
    id: 1,
    title: 'Backpack',
    price: 100.2,
    description: 'Perfect pack for your books',
    category: 'bags',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { product: fakeProduct } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
