import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {state} from "@angular/animations";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
//can t access a page from route , until the user is authenticated
@Injectable({
  providedIn: 'root'
})
export class AuthorizationPatientGuard implements CanActivate {

  constructor(private authService: AuthService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated
    if (this.authService.roles.includes("PATIENT")) {
      return true;
    } else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}

