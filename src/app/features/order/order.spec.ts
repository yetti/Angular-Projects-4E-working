import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Order } from './order';
import { TableOrder } from '../../core/models/table-order';

describe('Order', () => {
  let component: Order;
  let fixture: ComponentFixture<Order>;
  let closeSpy: ReturnType<typeof vi.fn>;

  async function createComponent(data: TableOrder) {
    closeSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Order],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: closeSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Order);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }

  describe('with an existing order', () => {
    beforeEach(() => {
      return createComponent({
        no: 1,
        items: [
          {
            name: 'Beer',
            qty: 2,
          },
        ],
      });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display quantities from the order in the menu', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const orderItemEls = compiled.querySelectorAll('app-order-item');
      const beerRow = Array.from(orderItemEls).find(
        (el) => el.querySelector('p')?.textContent?.trim() === 'Beer',
      );
      expect(beerRow?.querySelector(':scope > span')?.textContent).toContain('2');
    });

    it("should display 0 quantity for an item that wasn't ordered", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const orderItemEls = compiled.querySelectorAll('app-order-item');
      const sodaRow = Array.from(orderItemEls).find(
        (el) => el.querySelector('p')?.textContent?.trim() === 'Soda',
      );
      expect(sodaRow?.querySelector(':scope > span')?.textContent).toContain('0');
    });

    it('should close the dialog with order data', () => {
      component.ok();
      expect(closeSpy).toHaveBeenCalledWith([{ name: 'Beer', qty: 2 }]);
    });
  });

  describe('empty table', () => {
    beforeEach(() => {
      return createComponent({
        no: 1,
        items: undefined,
      });
    });

    it('should display 0 for all quantities in the menu', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const orderItemEls = compiled.querySelectorAll('app-order-item');
      const allZeroes = Array.from(orderItemEls).every(
        (el) => el.querySelector(':scope > span')?.textContent === '0',
      );
      expect(orderItemEls.length).toBeGreaterThan(0);
      expect(allZeroes).toBeTruthy();
    });
  });
});
