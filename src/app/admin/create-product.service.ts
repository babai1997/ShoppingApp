import { Product } from './create-product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateProductService {
  constructor(private http: HttpClient, private router: Router) {}

  addProduct(
    name: string,
    desc: string,
    image: File,
    quantity: string,
    price: string,
    category: string
  ) {
    const productData = new FormData();
    productData.append('name', name);
    productData.append('desc', desc);
    productData.append('image', image);
    productData.append('quantity', quantity);
    productData.append('price', price);
    productData.append('category', category);

    //console.log(product);
    this.http
      .post<{ message: string; product: any; productId: string }>(
        'http://localhost:3000/api/admin/add-product',
        productData
      )
      .subscribe((responseData) => {
        const id = responseData.productId;
        this.router.navigate(['/']);
        console.log(responseData);
      });
  }
}
