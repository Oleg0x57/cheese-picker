import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Route[] = [
  { path: 'orders', component: OrderListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', component: OrderListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
