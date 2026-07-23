import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Order } from './order';

describe('Order', () => {
  let component: Order;
  let fixture: ComponentFixture<Order>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Order],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            no: 1,
            items: [
              {
                name: 'Beer',
                qty: 2,
              },
            ],
          },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Order);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display quantities from the order in the menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const orderItemEls = compiled.querySelectorAll('app-order-item');
    const beerRow = Array.from(orderItemEls).find(el => el.querySelector('p')?.textContent?.trim() === "Beer");
    expect(beerRow?.querySelector(':scope > span')?.textContent).toContain('2');
  });

  it('should display 0 quantity for an item that wasn\'t ordered', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const orderItemEls = compiled.querySelectorAll('app-order-item');
    const sodaRow = Array.from(orderItemEls).find(el => el.querySelector('p')?.textContent?.trim() === "Soda");
    expect(sodaRow?.querySelector(':scope > span')?.textContent).toContain('0');
  })
});
