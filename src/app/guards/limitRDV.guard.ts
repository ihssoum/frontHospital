import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ExchangeOfDataService } from "../services/ExchangeOfData.service";

@Injectable({
  providedIn: 'root'
})
export class limitRDVguard implements CanActivate {
  actionPerformed: boolean = false;
  private cin: string = '';
  private subscription!: Subscription;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private router: Router,
              private exchangeOfDataService: ExchangeOfDataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.actionPerformed) {
      this.router.navigateByUrl("/listMed");
      return false;
    }

    this.subscription = this.exchangeOfDataService.getDoctorCin().subscribe(cin => {
      this.cin = cin;
      this.checkAppointmentLimit();
    });

    return false;
  }

  checkAppointmentLimit() {
    if (this.cin) {
      this.http.post<number>('http://localhost:8083/nbrRDV', { cin: this.cin, username: this.authService.username, date_demande: new Date() })
        .subscribe(
          (response) => {
            if (response < 3) {
              this.actionPerformed = true;
              console.log("true");
            } else {
              console.log("false");
              this.router.navigateByUrl("/listMed");
            }
          },
          (error) => {
            console.error('Error checking number of appointments:', error);
            this.router.navigateByUrl("/listMed"); // Handle error by redirecting to another page
          }
        );
    }
  }

  performAction() {
    this.actionPerformed = true;

  }
}
