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
     this.prodSvc.getProductDetailsPrmose("products").then(el => {
      this.products = el ;  
    });

    this.prodSvc.getProductDetailsObservables("products").subscribe(el => {
       this.products = el ;
    });

    // this.prodSvc.getProductDetails('products').subscribe(el=>{
    //   console.log("Success");
    //   if(Array.isArray(el)){
    //     this.products = el ;
    //   }
    //  // console.log(el);
    // },
    // error => {
    //   console.log(error);
    // },
    // () => {
    //   console.log("Call Complete");
    // })
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
