import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isUserAuthenticated: string;
  userId: string;
  cartData: Cart[] = [];
  cartLength: number;

  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value.email, this.form.value.password);
    this.authService.getAuthStatusListener().subscribe(async (val) => {
      if (val) {
        this.userId = this.authService.getUserId();
        await this.cartService.getCartData(this.userId);
        this.cartService
          .getCartDataUpdatedlistener()
          .subscribe((cart: Cart[]) => {
            this.cartData = cart;
            //console.log(this.cartLength, 'login');
          });
      }
    });
  }
}
