import {Component, ViewEncapsulation} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CartService} from './services/cart.service';
import {Observable} from 'rxjs';
import {Product} from './classes/product';

@Component({
  selector: 'spa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public shoppingCartItems: Product[] = [];
  public shoppingCartItems$: Observable<Product[]>;

  constructor(public location: Location
  , private cartService: CartService) {

    this.shoppingCartItems$ = this
      .cartService
      .getItemsCount();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
  }

}
