import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../order';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  isLoading: boolean;
  orders: Observable<Order[]>;
  selectedOrder: Order;
  exportLink;
  constructor(private repository: RepositoryService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getOrders();
    this.makeExportLink();
  }

  getOrders() {
    this.isLoading = true;
    this.orders = this.repository.getOrders().pipe(tap(data => console.log(data)), finalize(() => this.isLoading = false));
    this.selectedOrder = undefined;
  }

  select(order: Order) {
    this.selectedOrder = order;
  }

  add() {
    this.selectedOrder = new Order();
  }

  makeExportLink() {
    let theJSON = this.repository.export();
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.exportLink = uri;
  }

  import() {

  }

}
