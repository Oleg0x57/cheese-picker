import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  providers: [ProductService, OrderService],
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService, private orderService: OrderService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  addToCart(product: Product) {
    this.orderService.addToOrder(product);
  }

}
