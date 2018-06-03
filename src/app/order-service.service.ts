import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrder(): Observable<Order> {
    return of({
      name: 'me', items: [
        { product: 1, quantity: 10 },
        { product: 2, quantity: 2 }
      ]
    });
  }
}
