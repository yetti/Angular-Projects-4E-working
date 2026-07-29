import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ProductsService } from '../../core/services/products';
import { ProductList } from './product-list';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  const fakeProductService: Partial<ProductsService> = {
    getAll: () => {
      return of([
        {
          id: 1,
          title: 'Backpack',
          price: 100.2,
          description: 'Perfect pack for your books',
          category: 'bags',
        },
        {
          id: 2,
          title: 'Blue T-shirt',
          price: 22.3,
          description: 'Slim-fitting striped shirt',
          category: "men's clothing",
        },
      ]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        provideRouter([]),
        {
          provide: ProductsService,
          useValue: fakeProductService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selectedEls = Array.from(compiled.querySelectorAll('.pill span'));
    expect(selectedEls?.length).toBe(2);
    expect(selectedEls[0]?.textContent).toContain('Backpack');
    expect(selectedEls[1]?.textContent).toContain('Blue T-shirt');
  });
});
