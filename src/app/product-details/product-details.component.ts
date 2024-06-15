import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { cart, product } from '../dataType';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity:number=1;
  constructor(private activeRoute:ActivatedRoute, private sellerService:SellerService, private productService:ProductService){

  }

  ngOnInit(){
    const productId = this.activeRoute.snapshot.paramMap.get('productId')
    productId && this.sellerService.getProduct(productId).subscribe((detail)=>{
      this.productData = detail;
      // let user = localStorage.getItem('user');
      // if(user){
      //   let userId = user && JSON.parse(user)[0].id;
      //   this.sellerService.getCartList(userId)
      //   this.sellerService.cartItems.subscribe((result)=>{
      //     console.log(result)
      //   })
      // }
    })
  }

  minusQuantity(){
    if(this.productQuantity > 1){
      this.productQuantity --;
    }
  }
  plusQuantity(){
    if(this.productQuantity <20){
      this.productQuantity ++;
    }
  }

  addToCart(){
    //add to cart without user logged in
    if(this.productData){
      this.productData.quantity = this.productQuantity 
      if(!localStorage.getItem('user')){
        // console.log(this.productData);
       this.sellerService.localAddToCart(this.productData)
       alert('product added to cart');
      }else{
            //add to cart with user logged in

        // console.warn('user login')
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        // console.warn(userId);
        let cartData:any= {
          ...this.productData,
          userId,
          productId:this.productData.id

        }
        delete cartData.id;
        // console.log(cartData)
        this.productService.addToCart(cartData).subscribe((data)=>{
        alert('product is added to cart')
        this.sellerService.getCartList(userId)
          
        })
      }
    }

  }
}
