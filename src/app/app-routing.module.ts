import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { HomeComponent } from './home/home.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { ProductsComponent } from './products/products.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { authGuard } from './services/auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';


const routes: Routes = [
  {
    path:" ",
    redirectTo:"home",
    pathMatch:"full"
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"signin",
    component:UserLogInComponent
  },
  {
    path:"registration",
    component:UserRegistrationComponent
  },
  {
    path:"cartpage",
    component:CartpageComponent
  },
  {
    path:"productPage",
    component:ProductsComponent
  },
  {
    path:"sellerAuth",
    component:SellerAuthComponent,
    // canActivate: [authGuard]
  },
  {
    path:"sellerHome",
    component:SellerHomeComponent,
    canActivate: [authGuard]
  },
  {
    path:"sellerAddProduct",
    component:SellerAddProductComponent,
    // canActivate: [authGuard]
  },
  {
    path:"sellerUpdateProduct/:id",
    component:SellerUpdateProductComponent,
    
  },
  {
    path:"search/:query",
    component:SearchComponent
  },
  {
    path:"details/:productId",
    component:ProductDetailsComponent
  },
  {
    path:"checkoutPage",
    component:CheckoutPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
