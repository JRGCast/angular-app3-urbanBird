import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuySuccessComponent } from './order-buy-success.component';

describe('OrderBuySuccessComponent', () => {
  let component: OrderBuySuccessComponent;
  let fixture: ComponentFixture<OrderBuySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBuySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
