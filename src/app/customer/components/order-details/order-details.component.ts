import { Component, Input, OnInit } from '@angular/core';
import { LineItem } from '@model/line-item';
import { Order } from '../../model/order';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input()
  order: Order | null = new Order();
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  getDiscountedUnitPrice(li: LineItem): number{
    return li.product.unit_price * (100 - li.product.discount) / 100;
  }

  getAmount(li: LineItem): number {
    return li.quantity * li.product.unit_price * (100 - li.product.discount) / 100;
  }

  getSavings(li: LineItem): number {
    return li.quantity * li.product.unit_price * li.product.discount / 100;
  }

  getOrderValue(ord: Order): number{
    return this.orderService.getOrderValue(ord);
  }

  getOrderSavings(ord: Order): number {
    return this.orderService.getOrderSavings(ord);
  }
  

}
