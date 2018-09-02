import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, OrderRow } from '../order';
import { RepositoryService } from '../repository.service';
import { Product } from '../product';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnChanges {

  @Input() order: Order;
  orderForm: FormGroup;
  productValues: Product[];

  constructor(private fb: FormBuilder, private repository: RepositoryService) {
    this.getProductValues();
    this.createForm();
  }

  get rows(): FormArray {
    return this.orderForm.get('rows') as FormArray;
  }

  ngOnInit() {
    this.getProductValues();
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  getProductValues() {
    this.repository.getProducts().subscribe(products => this.productValues = products);
  }

  createForm() {
    this.orderForm = this.fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      rows: this.fb.array([])
    });
  }
  rebuildForm() {
    this.orderForm.reset({
      id: this.order.id,
      username: this.order.username,
    });
    this.setRows(this.order.rows);
  }

  setRows(products: OrderRow[]) {
    const rowFG = products.map(row => this.fb.group(row));
    const rowFGsArr = this.fb.array(rowFG);
    this.orderForm.setControl('rows', rowFGsArr);
  }

  addRow() {
    this.rows.push(this.fb.group(new OrderRow()));
  }

  onSubmit() {
    this.order = this.prepareSaveGroup();
    this.repository.saveOrder(this.order).subscribe();
    this.rebuildForm();
  }

  prepareSaveGroup() {
    const orderModel = this.orderForm.value;

    const rowsDeepCopy: OrderRow[] = orderModel.rows.map(
      (row: OrderRow) => Object.assign({}, row)
    );

    const saveOrder: Order = {
      id: orderModel.id,
      date: this.order.date,
      username: orderModel.username,
      rows: rowsDeepCopy,
    }
    return saveOrder;
  }

}
