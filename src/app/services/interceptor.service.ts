import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Intercepted ", req.url);
    if (req.url.search("/authenticate")!==-1 || req.url.search("/create")!==-1) {
      return next.handle(req);
    }
    else{
      const newReq = req.clone({
        headers: req.headers.append(
          "Authorization",
          "Bearer "+ this.getToken()
        )
      });
      console.log(newReq);
      return next.handle(newReq);
    }
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
