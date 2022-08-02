import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"",redirectTo:"/products",pathMatch:"full"},
  {path:"products",component:ProductsComponent},
  {path:"create-product",component:CreateProductComponent},
  {path:"update-product/:productId",component:CreateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
