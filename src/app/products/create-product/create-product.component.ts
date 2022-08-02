import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm!:FormGroup;
  id:any = 0;
  actionName:string = "";
  constructor(private fb:FormBuilder,private productSvc:ProductService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.route);
    this.id = this.route.snapshot.params['productId'];
    console.log('id', this.id);
    if (this.id) {
      this.actionName = 'Update';
     this.productSvc.getProductById("products",this.id).subscribe(el=>{
      this.productForm.setValue(el);
      console.log("data",el);
     })
    }else {
      this.actionName = "Create"
    }
  }

  createForm(){
    this.productForm = this.fb.group({
      id: [],
      productName: [''],
      description: [''],
      price: [],
      quantity: []
    })
  }

  submitForm(){
    if(this.actionName == "Create"){
      this.productSvc.insertProductDetls('products',this.productForm.value).subscribe((el)=>{
        this.router.navigate(['products']);
        console.log(el);
      })
    }else {
      this.productSvc.updateProductdetails('products',this.productForm.value).subscribe((el)=>{
        console.log(el);
      })
    }
  }
}

