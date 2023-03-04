import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateProductsComponent } from './admin/create-products/create-products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { CartComponent } from './cart/cart/cart.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'create',
    component: CreateProductsComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
