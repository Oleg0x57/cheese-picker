import { Component, OnChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PRODUCTS } from '../../mock-products';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/order';
import { OrderService } from '../../order-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  providers: [OrderService],
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnChanges {

  order: Order = new Order();
  products = PRODUCTS;
  orderForm: FormGroup;

  constructor(private api: OrderService, private fb: FormBuilder) {
    this.api.getOrder().subscribe(order => this.order = order);
    this.createForm();
  }

  get rows(): FormArray {
    return this.orderForm.get('rows') as FormArray;
  }

  createForm() {
    this.orderForm = this.fb.group({
      name: [this.order.name, Validators.required],
      rows: this.fb.array(this.order.items.map(item => this.fb.group(item)))
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.orderForm.reset({
      name: this.order.name,
    });
    this.setRows(this.order.items);
  }

  setRows(items: OrderItem[]) {
    const rowFormGroups = items.map(item => this.fb.group(item));
    const rowsFormArray = this.fb.array(rowFormGroups);
    this.orderForm.setControl('rows', rowsFormArray);
  }

  addRow() {
    this.rows.push(this.fb.group(new OrderItem(0, 0)));
  }

  removeRow(row: OrderItem) {
    alert('it\'s doing nothing!!!!');
  }
}
