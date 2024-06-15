import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { u_signIn, u_signUp } from '../dataType';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(data:u_signUp){
    console.log(data);
   return this.http.post('http://localhost:3000/users',data,{observe:'response'}) /* to cheack body response */

  }

  userSignIn(userSignInData:u_signIn){
    return this.http.get(`http://localhost:3000/users?email=${userSignInData.email}&password=${userSignInData.password}`,{observe:'response'})
  }

  /*to user logged in or not*/
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['home'])
    }
  }
}
