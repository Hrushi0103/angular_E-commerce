import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignIn, SignUp, product } from '../dataType';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // to count cart items 
  cartItems = new EventEmitter<product | []>

  constructor(private http:HttpClient) { }

/* seller's Auth Api Start*/
  sellerSignUp(sellerData:SignUp){
    return this.http.post('http://localhost:3000/seller',sellerData,{observe:'response'})
   
  }

  sellerSignIn(sellerSignIndata:SignIn){
    return this.http.get(`http://localhost:3000/seller?email=${sellerSignIndata.email}&password=${sellerSignIndata.password}`,{observe:'response'})
  }
  /* seller's Auth Api End*/


  /* Add Product Api */
  sellerAddProduct(productDetails:FormGroup){
    return this.http.post('http://localhost:3000/product',productDetails)
  } 

  sellerProductList(){
    return this.http.get<product>('http://localhost:3000/product')
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/product/${id}`)

  }


  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/product/${id}`)
  }
  localAddToCart(data:any){
    let cartData = []; 
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartItems.emit(data)
    
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    this.cartItems.emit(cartData)
  }

  getCartList(userId:string){
    this.http.get(`http://localhost:3000/cart?userId=${userId}`).subscribe((result:any)=>{
      console.log(result)
    if(result){
      this.cartItems.emit(result)
    }
    })
  }

/* updata Product api*/
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/product/${product.id}`,product)

  }





}
