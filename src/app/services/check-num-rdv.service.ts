import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckNumRdvService {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  LimitExceeded(cin: string): Observable<boolean> {
    return this.http.post<number>('http://localhost:8083/nbrRDV', { cin, username: this.authService.username, date_demande: new Date() })
      .pipe(
        map(response => {
          if (response < 2) {
            console.log(cin);
            console.log(this.authService.username);
            console.log(new Date())
            console.log(response);
            return false;
          } else {
            return true;
          }
        }),
        catchError(error => {
          console.error('Error checking number of appointments:', error);
          this.router.navigateByUrl("/listMed"); // Handle error by redirecting to another page
          return of(false); // Return false in case of error
        })
      );
  }


}

