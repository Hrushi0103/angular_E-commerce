import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
	popularProduct:any;
  trendyProduct:any;
  searchInput:undefined | string;
  constructor(private productService:ProductService, private route:Router){

  }
  ngOnInit(){
    this.productService.popularProduct().subscribe((data)=>{
      this.popularProduct = data;
    })

    this.productService.trendyProduct().subscribe((data)=>{
      this.trendyProduct = data;
    })
  }
/* search auto suggetion */
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result)=>{
        console.log(result)
      })
    }
  }
  /* search auto suggetion */

  submitSearch(){
    if(this.searchInput){
      this.route.navigate([`search/${this.searchInput}`])
    }
  }

  // addToCart(){
    
  // }

}
