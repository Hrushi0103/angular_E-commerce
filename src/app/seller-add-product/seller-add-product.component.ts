import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import{product} from '../dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  AddProductForm!:FormGroup;
  isProductAdded!:string
  constructor(private fb:FormBuilder, private sellerService:SellerService, private router:Router){
    this.initialize()
  }
  initialize(){
    this.AddProductForm = this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      color:['',Validators.required],
      catagory:['',Validators.required],
      discription:['',Validators.required],
      image:['',Validators.required]
    })
  }

  get Pname(){
    return this.AddProductForm.get("name")
  }

  onSubmit(productData:FormGroup){
    this.sellerService.sellerAddProduct(productData.value).subscribe((product)=>{
      console.log(product)
      if(product){
        this.isProductAdded ="Product Added Succesfully";
      }
      setTimeout(()=>{
        this.isProductAdded = "";
        this.router.navigate(['/sellerHome'])
      }, 4000)
  
    })
  }

}
