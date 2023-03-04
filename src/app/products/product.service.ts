import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../admin/create-product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get<{ message: string; products: any }>(
        'http://localhost:3000/api/admin/get-products'
      )
      .pipe(
        map((productData) => {
          return productData.products.map((product) => {
            return {
              productId: product._id,
              name: product.name,
              desc: product.description,
              imagePath: product.imagePath,
              quantity: product.quantity,
              price: product.price,
              category: product.category,
            };
          });
        })
      )
      .subscribe((transformedProducts) => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductDetails(id: string) {
    return this.http.get<{ message: string; product: any }>(
      'http://localhost:3000/api/admin/get-product/' + id
    );
  }

  getProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }
}
