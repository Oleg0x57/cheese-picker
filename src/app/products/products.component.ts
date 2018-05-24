import { Component, OnInit, ViewChild } from '@angular/core';

import { Product } from '../product'
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns = ['id', 'title', 'price'];
  dataSource: MatTableDataSource<Product>;
  products: Product[];

  selectedProduct: Product;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  getProducts(): void {
    this.products = this.productService.getProducts();
  }

}
