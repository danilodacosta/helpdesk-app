import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router/';
import { SharedService } from 'src/app/service/shared.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  public shared: SharedService;

  constructor(private router: Router) {
    this.shared = SharedService.getInstance();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.shared.isLoggedIn()) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }

}
