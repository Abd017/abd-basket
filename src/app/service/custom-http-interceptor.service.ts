import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if the user has logged in, then add a new HttpHeader to the request
        // Authorization: Bearer <jwt-from-session-storage>
        let {jwt} = sessionStorage;
        if (!jwt) {
            return next.handle(req);
        }

        // create a new req based on the old request
        // add the Auth header
        // send new request
        let headers = new HttpHeaders({ Authorization: `Bearer ${jwt}` });
        let newReq = req.clone({ headers });
        return next.handle(newReq);
    }
    
}