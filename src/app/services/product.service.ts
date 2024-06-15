import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../dataType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  cartItems = new EventEmitter<product | []>

  popularProduct(){
    return  this.http.get(`http://localhost:3000/product?_limit=3`)
  }

  trendyProduct(){
    return this.http.get(`http://localhost:3000/product`)
  } 
  
  searchProduct(query:any){
    return this.http.get(`http://localhost:3000/product?catagory=${query}`)
  } 

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }

  // Api for cart items
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any>(`http://localhost:3000/cart?userId=${userData[0].id}`)
  }

  removeToCart(productId:string){
    return this.http.delete(`http://localhost:3000/cart/${productId}`)
  }
 

 


}
