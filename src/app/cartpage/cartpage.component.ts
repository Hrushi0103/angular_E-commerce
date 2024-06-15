import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../dataType';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
 cartData!:cart[];

 priceSummary={
  price:0,
  tax:0,
  shipping:0,
  total:0
 }

  constructor(private productService:ProductService, private sellerService:SellerService, private route:Router){

  }
  ngOnInit(){
    this.productService.currentCart().subscribe((result)=>{
      this.cartData=result;
      let price=0;
      result.forEach((items:any)=>{
        if(items.quantity){
          price = price+ (+ items.price*items.quantity)
        }
      })
      this.priceSummary.price=price;
      this.priceSummary.shipping=70;
      this.priceSummary.tax= Math.floor(price/20);
      this.priceSummary.total=Math.floor(this.priceSummary.price+this.priceSummary.shipping+this.priceSummary.tax);
    })
  }
  removeCartItem(id:string){
    let user = localStorage.getItem('user');
     let userId = user && JSON.parse(user)[0].id;

    if(localStorage.getItem('user')){
      this.productService.removeToCart(id).subscribe((result)=>{
        if(result){
          this.productService.currentCart().subscribe((result)=>{
            this.cartData=result;
          })
          this.sellerService.getCartList(userId)
        }
       })
     }
    }
   
    Checkout(){
      // this.route.navigate(['checkoutPage'])
    }

}
