import { Injectable } from '@angular/core';
import { Order } from './order';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  orders: Order[] = [];
  products: Product[] = [];

  constructor() {
    this.fetchOrders();
    this.fetchProducts();
  }

  fetchOrders() {
    this.orders = [];
    const localOrders = JSON.parse(localStorage.getItem('orders'));
    if (localOrders) {
      this.orders = localOrders;
    }
  }

  fetchProducts() {
    this.products = [];
    const localProducts = JSON.parse(localStorage.getItem('products'));
    if (localProducts) {
      this.products = localProducts;
    }
  }

  getOrders(): Observable<Order[]> {
    return of(JSON.parse(localStorage.getItem('orders'))).pipe(delay(500));
  }

  saveOrder(order: Order): Observable<Order> {
    let oldOrder;
    let newOrder;
    if (this.orders.length > 0 && (oldOrder = this.orders.find(o => o.id === order.id))) {
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

  getProducts(): Observable<Product[]> {
    return of(JSON.parse(localStorage.getItem('products'))).pipe(delay(500));
  }

  saveProduct(product: Product): Observable<Product> {
    let oldProduct;
    let newProduct;
    if (this.products.length > 0 && (oldProduct = this.products.find(p => p.id === product.id))) {
      newProduct = Object.assign(oldProduct, product);
    } else {
      newProduct = product;
      this.products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(this.products));
    return of(newProduct).pipe(delay(500));
  }

}
