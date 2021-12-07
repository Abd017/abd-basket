import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { CustomerService } from '@service/customer.service';
import { Order } from '../../model/order';
import { OrderService } from '../../service/order.service';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  dataLoaded: boolean = false;
  orders: Order[] = [];
  orderToDisplayDetails: (Order | null) = null;
  
  display: string = "none";
  
  constructor(private orderService: OrderService, private customerService: CustomerService, private router: Router) { }
  
  ngOnInit(): void {
    
    if(!this.customerService.isLoggedIn){
      this.router.navigate(['/customer/login'], { queryParams: { redirectTo: '/customer/order-history'}});
    }
    
    this.orderService
    .getOrders()
    .subscribe(data => {
      this.orders = data;
      this.dataLoaded=true;
    });
  }
  
  getOrderValue(order: Order): number {
    return this.orderService.getOrderValue(order);
  }
  
  getOrderSavings(order: Order): number {
    return this.orderService.getOrderSavings(order);
  }
  
  getOrderItemCount(order: Order): number {
    return this.orderService.getOrderItemCount(order);
  }
  
  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }
  
}
