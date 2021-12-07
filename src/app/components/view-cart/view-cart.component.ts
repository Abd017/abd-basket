import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineItem } from '@model/line-item';
import { CartService } from '@service/cart.service';
import { Order } from 'src/app/customer/model/order';
import { OrderService } from 'src/app/customer/service/order.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(public cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  confirmAndEmptyCart(){
    this.cartService.emptyCart();
  }

  getDiscountedUnitPrice(pr: Product): number{
    return pr.unit_price * (100 - pr.discount) / 100;
  }

  getAmount(li: LineItem): number {
    return li.product.unit_price * li.quantity * (100 - li.product.discount) / 100;
  }

  getSavings(li: LineItem): number {
    return li.product.unit_price * li.quantity * li.product.discount / 100;
  }

  get cartValue(): number{
    return this.cartService.getCartValue();
  }

  get cartSavings(): number {
    return this.cartService.getCartSavings();
  }

  placeOrder(){
    let order: Order = new Order();
    order.lineItems = [...this.cartService.cart];
    this.orderService
    .placeOrder(order)
    .subscribe(() => {
      this.router.navigate(['/customer','order-history'])
      this.cartService.emptyCart();
    })
  }

}
