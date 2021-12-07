import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ordersUrl } from 'src/app/urls';
import { Order } from '../model/order';

import 'rxjs/add/operator/map';
import { root } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient: HttpClient) { }

    getOrders(): Observable<Order[]>{

      // let options = {
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      //     Accept: 'application/json'
      //   }
      // }
      return this.httpClient
        .get(ordersUrl)
        .map(value => value as Order[])
    }

    getOrderValue(order: Order): number {
      let total = 0;
      order.lineItems.forEach(li => {
        total += li.product.unit_price * li.quantity * (100 - li.product.discount) / 100;
      });
      return total;
    }
  
    getOrderSavings(order: Order): number {
      let savings = 0;
      order.lineItems.forEach(li => {
        savings += li.product.unit_price * li.quantity * li.product.discount / 100;
      });
      return savings;
    }

    getOrderItemCount(order: Order): number {
      return order.lineItems.length;
    }

    placeOrder(order: Order): Observable<any>{
      return this.httpClient
        .post(ordersUrl, order);
    }
}
