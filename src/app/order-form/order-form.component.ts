import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../order';
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

  constructor(private fb: FormBuilder, private repository: RepositoryService) {
    this.createForm();
  }

  get products(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  createForm() {
    this.orderForm = this.fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      products: this.fb.array([])
    });
  }
  rebuildForm() {
    this.orderForm.reset({
      id: this.order.id,
      username: this.order.name,
    });
    this.setProducts(this.order.products);
  }

  setProducts(products: Product[]) {
    const productFG = products.map(product => this.fb.group(product));
    const productFGsArr = this.fb.array(productFG);
    this.orderForm.setControl('products', productFGsArr);
  }

  addProduct() {
    this.products.push(this.fb.group(new Product()));
  }

  onSubmit() {
    this.order = this.prepareSaveGroup();
    this.repository.saveOrder(this.order).subscribe();
    this.rebuildForm();
  }

  prepareSaveGroup() {
    const orderModel = this.orderForm.value;

    const productsDeepCopy: Product[] = orderModel.products.map(
      (product: Product) => Object.assign({}, product)
    );

    const saveOrder: Order = {
      id: orderModel.id,
      date: this.order.date,
      name: orderModel.username,
      products: productsDeepCopy,
    }

    return saveOrder;

  }

}
