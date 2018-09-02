import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../order';
import { RepositoryService } from '../repository.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private repository: RepositoryService) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
  rebuildForm() {
    this.productForm.reset({
      id: this.product.id,
      username: this.product.name,
    });
  }

  onSubmit() {
    this.product = this.prepareSaveGroup();
    this.repository.saveProduct(this.product).subscribe();
    this.rebuildForm();
  }

  prepareSaveGroup() {
    const productModel = this.productForm.value;
    const saveProduct: Product = {
      id: productModel.id,
      name: productModel.name,
      quantity: null
    }
    return saveProduct;
  }

}
