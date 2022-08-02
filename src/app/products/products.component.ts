import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './models/Product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 products:Product[] = [] ;
  constructor(private prodSvc:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(){
    this.prodSvc.getProductDetails('products').subscribe(el=>{
      if(Array.isArray(el)){
        this.products = el ;
      }
      console.log(el);
    },
    error => {
      console.log(error);
      
    })
  }

  updateProdDetails(id:number){
   this.router.navigate(['update-product',id]);
  }

  deleteProductDetails(id:number,index:number){
    this.prodSvc.deleteProductdetails("products",id).subscribe(el=>{
      console.log(el);
      this.products.splice(index,1);
    })
  }
}
