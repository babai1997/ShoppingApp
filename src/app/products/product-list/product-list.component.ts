import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/admin/create-product.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isUserAuthenticated = false;
  isAddToCart = false;
  cart: Cart[] = [];
  userId: string;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.productService
      .getProductsUpdatedListener()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products, 'product-list');
      });

    this.isUserAuthenticated = this.authService.getIsUserAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.authService.getAuthUserIdListener().subscribe((id) => {
        this.userId = id;
        this.cartService.getCartData(this.userId);
        this.cartService
          .getCartDataUpdatedlistener()
          .subscribe((cart: Cart[]) => {
            this.cart = cart;
          });
      });
    });
  }

  addToCart(product: Product) {
    console.log(this.cart, 'addToCart');
    this.isUserAuthenticated = this.authService.getIsUserAuth();

    if (this.isUserAuthenticated) {
      this.userId = this.authService.getUserId();
      const cartData: Cart = {
        userId: this.userId,
        name: product.name,
        price: product.price,
        category: product.category,
        imagePath: product.imagePath,
        desc: product.desc,
        limitedQuant: +product.quantity,
        productQuant: 1,
        productId: product['productId'],
        id: null,
      };
      let index = this.products.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        //this.products[index].isAddToCart = true;
      }

      this.cartService.createCart(cartData);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
