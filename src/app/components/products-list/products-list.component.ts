import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  selectedProduct: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  onEdit(product: Product): void {
    this.selectedProduct = product;
  }
  onDelete(product: Product): void {
    this.selectedProduct = product;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  add(title: string): void {
    title = title.trim();
    if(!title){return;}
    this.productService.addProduct({title} as Product).subscribe(product => {this.products.push(product)});
  }

  delete(product: Product): void {
    this.products.filter(p => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }
}
