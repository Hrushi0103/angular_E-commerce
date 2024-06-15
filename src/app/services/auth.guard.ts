import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let isSellerLoggedIn = localStorage.getItem('seller')
  if(!isSellerLoggedIn){
    alert("LogIn first");
    router.navigate(['sellerAuth'])
    return false
  }else {
    return true;
  }

 
};
