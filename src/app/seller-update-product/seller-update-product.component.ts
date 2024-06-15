import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { ActivatedRoute, Router} from '@angular/router';
import { product } from '../dataType';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  UpdateProductForm!:FormGroup;
  isProductAdded!:string
  ProdctData!:product;
  isUpdateProduct:undefined|string;

  constructor(private fb:FormBuilder, private sellerService:SellerService, private router:ActivatedRoute, private rout:Router){
    this.initialize()
  }
  ngOnInit(){
    let productId = this.router.snapshot.paramMap.get('id')
    productId && this.sellerService.getProduct(productId).subscribe((data) => 
      {
      this.ProdctData = data;
      console.log(data)
    }
    )
  }

  initialize(){
    this.UpdateProductForm = this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      color:['',Validators.required],
      catagory:['',Validators.required],
      discription:['',Validators.required],
      image:['',Validators.required]
    })
  }

  get Pname(){
    return this.UpdateProductForm.get("name")
  }

  onSubmit(updatedData:product){
  //  console.log(updatedData.value)
  //  console.log(this.ProdctData)
  updatedData.id = this.ProdctData.id;
  this.sellerService.updateProduct(updatedData).subscribe((result)=>{
    if(result){
      this.isUpdateProduct ="Product updated succesfully";
    }
    setTimeout(()=>{
      this.isUpdateProduct=undefined;
      this.rout.navigate(['sellerHome'])
    },3000)
  })
  }

}
