import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menueType: string = 'default';
  sellerName:string='';
  userName:string='';
  countCartItem = 0;

  constructor(private route:Router, private sellerService:SellerService, private productService:ProductService){
    this.isSellerLoggedIn()
  }

  ngOnInit(){
/* update cart counter */
    let user = localStorage.getItem('user');
    if(user){
      let userId = user && JSON.parse(user)[0].id;
      this.sellerService.getCartList(userId)
      this.sellerService.cartItems.subscribe((result)=>{
        console.log(result)
      })
    }
  /* -----------------------------------------*/

    /* get url */
    this.route.events.subscribe((val:any)=>{
      // console.log(val.url)
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.log("inside seller");
          this.menueType="seller";
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore &&  JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name
          this.menueType = 'user'
        }
        else{
          // console.warn("outside seller")
          this.menueType="default";
        }
      }
      // console.log(this.menueType)
    })
    //show cart items
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.countCartItem = JSON.parse(cartData).length;
     
    }

    this.sellerService.cartItems.subscribe((item)=>{
      this.countCartItem = item.length;
    })

   
  }

  sellerLogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['home'])
  }
  userLogout(){
    localStorage.removeItem('user');
    alert('logged out')
    this.route.navigate(['home'])
    this.sellerService.cartItems.emit([]);
  }

  isSellerLoggedIn(){
    if(localStorage.getItem('seller')){
      this.route.navigate(['sellerHome'])
    }else{
      this.route.navigate(['sellerAuth'])
    }
  }

  isUserLogin(){
   alert("log in first")
   this.route.navigate(['signin'])
  }

}
