import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isLoading: boolean;
  products: Observable<Product[]>;
  selectedProduct: Product;
  constructor(private repository: RepositoryService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.products = this.repository.getProducts().pipe(tap(data => console.log(data)), finalize(() => this.isLoading = false));
    this.selectedProduct = undefined;
  }

  add() {
    this.selectedProduct = new Product();
  }

  select(product: Product) {
    this.selectedProduct = product;
  }

  saveProduct(product: Product) {
    this.repository.saveProduct(product);
  }

}
