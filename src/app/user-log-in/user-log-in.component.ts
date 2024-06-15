import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { cart, product } from '../dataType';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent {
hide:boolean=true;

logInForm!:FormGroup;

showUserSignUp!: true;

loginErrorMessege:string=" ";


  constructor(private fb:FormBuilder, private userService:UserService, private route:Router, private productService:ProductService, private sellerService:SellerService){
    this.logInForm = fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }
  
  get Email(){
    return this.logInForm.get("email")
  }
  get Password(){
    return this.logInForm.get("password")
  }

  getUserLogInData(){
    if(this.logInForm.valid){
      this.userLoggedIn();
    }
  }

  userLoggedIn(){
    this.userService.userSignIn(this.logInForm.value).subscribe((result:any)=>{
      if(result.body.length != 0){
        localStorage.setItem('user',JSON.stringify(result.body))
        console.log(result)
        alert("logged in")
        this.route.navigate(['home'])
        this.localCartToRemoteCart();
      }else{
        this.loginErrorMessege="incorrect email or password"
      }
    })
    setTimeout(()=>{
      this.loginErrorMessege = " ";
    },3000)
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if(data){
      let cartDataList:product[] = JSON.parse(data)
     
      cartDataList.forEach((product:product) => {
        let cartdata:any = {
          ...product,
          productId:product.id,
          userId
        }
         delete cartdata.id;
        this.productService.addToCart(cartdata).subscribe((data)=>{
          if(data){
            console.log('local cart added to db')
            localStorage.removeItem('localCart')
          }
        })
      });

    }
    this.sellerService.getCartList(userId)

  }

  
}
