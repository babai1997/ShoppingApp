import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private userId: string;
  isUserAuthenticated = false;
  cartData: Cart[] = [];
  removeCart = false;
  limitedQuantity: number;
  productQuantity = 1;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.getAuthUserIdListener();
    this.cartService.getCartData(this.userId);
    this.cartService.getCartDataUpdatedlistener().subscribe((cart: Cart[]) => {
      this.cartData = cart;
    });
  }
  removeToCart(id: any) {
    this.cartService.removeCartData(id);
  }

  handleQuantity(
    val: string,
    limitedQuantity: number,
    productQuant: number,
    productId: string
  ) {
    const i = this.cartData.findIndex(
      (obj: any) => obj.productId === productId
    );
    if (i >= 0) {
      if (
        this.cartData[i].productQuant < this.cartData[i].limitedQuant &&
        val === 'plus'
      ) {
        this.cartData[i].productQuant++;
        console.log(this.cartData, 'Quantity');
      } else if (this.cartData[i].productQuant > 1 && val === 'min') {
        this.cartData[i].productQuant--;
      }
    }
  }
}
