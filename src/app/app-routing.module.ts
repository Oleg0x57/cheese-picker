import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

const routes: Route[] = [
  {path: 'catalog', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: '', component: ProductsComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
