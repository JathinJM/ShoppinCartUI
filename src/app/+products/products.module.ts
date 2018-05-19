import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {RouterModule} from '@angular/router';
import {routes} from './products.routes';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule {
}
