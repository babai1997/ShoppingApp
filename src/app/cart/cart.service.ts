import { Injectable, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cartData: Cart[] = [];
  private cartDataUpdated = new Subject<Cart[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  createCart(cart: Cart) {
    this.http
      .post<{ message: string; cartData: string }>(
        'http://localhost:3000/api/cart/add-product',
        cart
      )
      .subscribe((response) => {
        this.cartData.push(cart);
        this.cartDataUpdated.next([...this.cartData]);
        //console.log(response);
      });
  }

  getCartData(userId: string) {
    this.http
      .get<{ message: string; cartData: any }>(
        'http://localhost:3000/api/cart/get-product/' + userId
      )
      .pipe(
        map((response) => {
          return response.cartData.map((cart) => {
            return {
              id: cart._id,
              userId: cart.userId,
              productId: cart.productId,
              name: cart.name,
              productQuant: cart.productQuant,
              limitedQuant: cart.limitedQuant,
              desc: cart.desc,
              price: cart.price,
              imagePath: cart.imagePath,
              category: cart.category,
            };
          });
        })
      )
      .subscribe((updatedCartData) => {
        this.cartData = updatedCartData;
        this.cartDataUpdated.next([...this.cartData]);
        //console.log(this.cartData, 'cart-service');
        //console.log(this.cartData.length);
      });
  }
  updateCartData() {}

  getCartDataUpdatedlistener() {
    return this.cartDataUpdated.asObservable();
  }

  removeCartData(cartId: string) {
    this.http
      .delete('http://localhost:3000/api/cart/delete/' + cartId)
      .subscribe((response) => {
        const updatedCart = this.cartData.filter((cart) => cart.id !== cartId);
        this.cartData = updatedCart;
        this.cartDataUpdated.next([...this.cartData]);
        //console.log(response);
      });
  }
}
