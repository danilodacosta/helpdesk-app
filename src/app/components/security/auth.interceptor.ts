import { SharedService } from './../../service/shared.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  shared: SharedService;

    constructor() {
        this.shared = SharedService.getInstance();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (this.shared.isLoggedIn()) {
         const authRequest = request.clone(
            // tslint:disable-next-line:object-literal-key-quotes
            {setHeaders: {'Authorization': this.shared.token}});
         return next.handle(authRequest);
      } else {
        return next.handle(request);
    }
  }
}
