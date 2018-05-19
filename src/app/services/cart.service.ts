import {Injectable} from '@angular/core';
import {Product} from '../classes/product';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import {of} from 'rxjs/observable/of';
@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];
  public serviceurl='http://localhost:3000/carts';
  constructor(private http: Http) {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addToCart(item: Product) {
    this.cartPost(item).subscribe(_ => this.itemsInCart=_);
    this.itemsInCartSubject.next([...this.itemsInCart, item]); 
  }

public cartPost(item)
{
 
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  let body = JSON.stringify(item);
  return this.http.post(this.serviceurl, body, options ).map((res: Response) => res.json());
}
public cartDelete(item)
{
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
return this.http.delete(this.serviceurl+'/'+item.id,options).map((res: Response) => res.json());
}
public removeFromCart(item: Product) 
{
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id); 
  
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }
  public getItemsCount() {
    return  this.http.get(this.serviceurl)
    .map(res => res.json())
  }
  public getItemsById(Id) {
    return  this.http.get(this.serviceurl+'/'+Id)
    .map(res => res.json())
  }
  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + curr.price;
      }, 0);
    });
  }
}
