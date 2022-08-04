import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable,tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("request at interceptor", request);
    const token = "hhgh";
    request = request.clone({ "headers": request.headers.set("Content-type", "application/json") });
   // request = request.clone({ "headers": request.headers.set("Authorization Token", token) });
    return next.handle(request)
      .pipe(tap(el => {
        if (el instanceof HttpResponse) {
          console.log("response at interceptor");
        }
      }),
      catchError((error:HttpErrorResponse) => {
        let message = "";
        if(error.error instanceof ErrorEvent){
          message = error.error.message ;
        }else {
          message = error.message;
        }
       return throwError(message);
      }) 
      );
  }
}
