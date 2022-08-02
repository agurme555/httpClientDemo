import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Product } from "./models/Product";

@Injectable({
    providedIn:"root"
})
export class ProductService{

  BaseUrl:string = "http://localhost:3000/"
    constructor(private http:HttpClient){

    }

   insertProductDetls(endPoint:string,product:Product):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set("Conent-type","application/json");
    return this.http.post(this.BaseUrl+endPoint,product,{'headers':headers}).pipe(catchError(this.handleErrorEvent));
   } 

   getProductDetails(endPoint:string):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set("Content-type","application/json");
    return this.http.get<Product[]>(this.BaseUrl+endPoint,{"headers":headers}).pipe(catchError(this.handleErrorEvent));
   }

   getProductById(endPoint:string,id:number){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type","application/json");
    return this.http.get(this.BaseUrl+ endPoint + "/"+id,{"headers":headers}).pipe(catchError(this.handleErrorEvent));
   }

   updateProductdetails(endPoint:string,product:Product){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type","application/json");
    return this.http.put(this.BaseUrl+ endPoint + "/"+product.id,product,{"headers":headers}).pipe(catchError(this.handleErrorEvent));
   }

   deleteProductdetails(endPoint:string,id:number){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type","application/json");
    return this.http.delete(this.BaseUrl+ endPoint + "/"+ id,{"headers":headers}).pipe(catchError(this.handleErrorEvent));
   }
   
   handleErrorEvent(event:HttpErrorResponse){
    console.log(event);
    let message  = "" ;
    if(event.error instanceof ErrorEvent){
        console.log("client messsage",message);
        message = event.error.message;
    }else {
        message = event.message;
    }
    return throwError(message);
   }
   
}