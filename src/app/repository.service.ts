import { Injectable } from '@angular/core';
import { Order } from './order';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  orders: Order[] = [];

  constructor() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orders = [];
    const localOrders = JSON.parse(localStorage.getItem('orders'));
    if (localOrders) {
      this.orders = localOrders;
    }
  }

  getOrders(): Observable<Order[]> {
    return of(JSON.parse(localStorage.getItem('orders'))).pipe(delay(500));
  }

  saveOrder(order: Order): Observable<Order> {
    let oldOrder;
    let newOrder;
    if (this.orders.length > 0 && (oldOrder = this.orders.find(g => g.id === order.id))) {
      newOrder = Object.assign(oldOrder, order);
    } else {
      newOrder = order;
      this.orders.push(order);
    }
    localStorage.setItem('orders', JSON.stringify(this.orders));
    return of(newOrder).pipe(delay(500));
  }

  export() {
    return localStorage.getItem('orders');
  }

}
