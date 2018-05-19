import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../services/products.service';
import {Product} from '../../../classes/product';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'spa-product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: ['product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: Product = {};
  public cart: Product = {};
  constructor(private route: ActivatedRoute
    , private router: Router
    , private productsService: ProductsService
    , private cartService: CartService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productsService
        .getProduct(id)
        .subscribe(_ => this.product = _);
        this.cartService
        .getItemsById(id)
        .subscribe(_ => _.forEach(cart => {
           this.cart=cart;
        }))
        
    });
  }

  public addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
