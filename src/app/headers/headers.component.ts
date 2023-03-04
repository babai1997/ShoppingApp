import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit {
  isUserAuthenticated = false;
  cartQuantity: number;
  cartData: any;
  userId: string;
  cartLength: number;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsUserAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.authService.getAuthUserIdListener().subscribe(async (id) => {
        this.userId = id;
        //console.log(this.userId);
        this.cartService.getCartData(this.userId);

        this.cartService
          .getCartDataUpdatedlistener()
          .subscribe((cart: Cart[]) => {
            //console.log(cart, 'under');
            this.cartLength = cart.length;
            this.cartData = cart;
            //console.log(this.cartLength, 'head');
          });
      });
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
