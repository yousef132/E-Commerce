import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartComponent } from './carts/components/cart/cart.component';

export const routes: Routes =
[
  {path:"products",component:AllProductsComponent},
  {path:"details",component:ProductDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"**",redirectTo:"products",pathMatch:"full"},

];
