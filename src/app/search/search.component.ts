import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchItems:undefined | any;
  constructor(private activeRoute:ActivatedRoute, private productService:ProductService){

  }
  ngOnInit(){
    const query = this.activeRoute.snapshot.paramMap.get('query')
    // console.log(query)
    query && this.productService.searchProduct(query).subscribe((resust)=>{
      this.searchItems = resust;
    })
  }
}
