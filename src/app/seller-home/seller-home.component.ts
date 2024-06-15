import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { product } from '../dataType';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList!:any;
  constructor(private sellerService:SellerService){

  }

  ngOnInit(){
    this.sellerService.sellerProductList().subscribe((list)=>{
      this.productList = list;
    })
  }

  deleteProduct(id:string){
    // console.log("test id"+id)
    this.sellerService.deleteProduct(id).subscribe(()=>{
      this.ngOnInit()
    })
  }

}
