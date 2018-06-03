import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PRODUCTS } from '../mock-products';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        tap(products => this.log('fetched products')),
        catchError(this.handleEror('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => this.log(`fetched product id: ${id}`)),
        catchError(this.handleEror<Product>(`get product id: ${id}`))
      );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiUrl, product, httpOptions).pipe(
      tap(_ => this.log(`update product id: ${product.id}`)),
      catchError(this.handleEror<any>(`update product`))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, httpOptions).pipe(
      tap((product: Product) => this.log(`added product w/ id: ${product.id}`)),
      catchError(this.handleEror<Product>('addProduct'))
    );
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`delete product id: ${id}`)),
      catchError(this.handleEror<Product>('deleteProduct'))
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleEror<Product[]>('searchProducts', []))
    );
  }

  private log(message: string) { console.log(message); }

  private handleEror<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
