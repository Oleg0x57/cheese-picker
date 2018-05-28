import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { OrderComponent } from './components/order/order.component';

const routes: Route[] = [
  { path: 'catalog', component: ProductsListComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: OrderComponent },
  { path: '', component: ProductsListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
