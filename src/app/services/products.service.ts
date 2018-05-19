import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Product} from '../classes/product';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
@Injectable()
export class ProductsService {
  public serviceurl='http://localhost:3000/products';
  constructor (private http: Http) {
   
  }
  
  ngOnInit() {   
   
}
products() {
  return this.http.get(this.serviceurl)
  .map(res => res.json())
}
  public getProducts(): Observable<Product[]> {
    return this.products();
  }
 
  public getProduct(id: number): Observable<Product> {
    return this
      .products()
      .map(_ => {
        return _.find((item: Product) => {
          return item.id === id;
        });
      });
  }
}

