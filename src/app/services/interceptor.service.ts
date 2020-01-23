import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class InterceptorService implements HttpInterceptor {

intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
console.log("Intercepted ",req)
const newReq=req.clone({headers :req.headers.append('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrdXR0eSIsImV4cCI6MTU3OTYwNzYwNywiaWF0IjoxNTc5NTg5NjA3fQ.XtbiDREdTvHgynWiCL5NMm6W2gIVK_CsmBeXtuNp0M3cF3DdqckSb_H2Ae7NerMQ5et14D7UQU6IvSF7E1sm-g')})
 
return next.handle(newReq);
}
}
