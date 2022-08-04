import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
import { catchError, Observable, of, retry, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Product } from "./models/Product";

@Injectable({
  providedIn: "root"
})
export class ProductService {

  BaseUrl: string = "http://localhost:3000/"
  constructor(private http: HttpClient) {

  }

  insertProductDetls(endPoint: string, product: Product): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.set("Conent-type","application/json");
    return this.http.post(this.BaseUrl + endPoint, product, { 'headers': {} });
  }

  getProductDetailsPrmose(endPoint: string): Promise<any> {
    return this.http.get<Product[]>(this.BaseUrl + endPoint).toPromise();
  }

  getProductDetailsObservables(endPoint: string) {
    return this.http.get<Product[]>(this.BaseUrl + endPoint).pipe(retry(1));
  }








  getProductDetails1(endPoint: string): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.set("Content-type","application/json");
    console.log("req at service");
    return this.http.get<Product[]>(this.BaseUrl + endPoint);
  }

  getProductById(endPoint: string, id: number) {
    // let headers = new HttpHeaders();
    // headers = headers.set("Content-type","application/json");
    console.log("req at service");
    return this.http.get(this.BaseUrl + endPoint + "/" + id, { "headers": {} });
  }

  updateProductdetails(endPoint: string, product: Product) {
    // let headers = new HttpHeaders();
    // headers = headers.set("Content-type","application/json");
    console.log("req at service");
    return this.http.put(this.BaseUrl + endPoint + "/" + product.id, product, { "headers": {} });
  }

  deleteProductdetails(endPoint: string, id: number) {
    // let headers = new HttpHeaders();
    // headers = headers.set("Content-type","application/json");
    console.log("req at service");
    return this.http.delete(this.BaseUrl + endPoint + "/" + id, { "headers": {} });
  }



  handleErrorEvent(event: HttpErrorResponse) {
    console.log(event);
    let message = "";
    if (event.error instanceof ErrorEvent) {
      console.log("client messsage", message);
      message = event.error.message;
    } else {
      message = event.message;
    }
    return throwError(message);
  }

}

