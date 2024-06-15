import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../dataType';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  hide = true
  authContainer = false;  /*<-- show hide container*/
  isSellerLoggedIn = new BehaviorSubject(false);/* <----sellerHome route auth */

  constructor(private sellerService:SellerService, private router:Router){

  }
  sellerSignupForm(sellerSignUpdata:SignUp){
    this.sellerService.sellerSignUp(sellerSignUpdata).subscribe((result) =>{
      if(result){
        console.log(result)
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['sellerHome'])
      }
    })
  }

  sellerSignInForm(sellerSignIndata:SignIn){
    this.sellerService.sellerSignIn(sellerSignIndata).subscribe((result:any) =>{
      if(result && result.body && result.body.length){
        alert("log in Succesfull")
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['sellerHome'])
      }else{
        alert(`log in Unsuccesfull
incorrect email and password`)
      }
    })
   
  }



  showSignIn(){
    this.authContainer=false;
  }
  showSignUp(){
    this.authContainer=true;
  }
}
