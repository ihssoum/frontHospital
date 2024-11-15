import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class AccessURLEvaluationGuard implements CanActivate {
  private actionPerformed: boolean = false;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.actionPerformed) {
      this.router.navigateByUrl("/listMed");
      return false;
    }
    return true
  }
  performAction() {
    this.actionPerformed = true;
  }
}
