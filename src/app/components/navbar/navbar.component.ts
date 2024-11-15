import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccessURLEvaluationGuard} from "../../guards/ControlUrlAccess.guard";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import * as http from "http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  patient!: any;
  isAuthenticated = this.authService.isAuthenticated;

  constructor(
    private router: Router,
    public authService: AuthService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.getPatientInfo();

  }

  getPatientInfo() {
    this.http.get<any>('http://localhost:8083/getInfos/' + this.authService.username)
      .subscribe(
        (data: any) => {
          this.patient = data;
        },
        (error) => {
          console.error('Error fetching patients:', error);
        }
      );

  }

  logout() {
    this.authService.Logout();
  }

  accueil() {
    this.router.navigateByUrl("accueil");
  }
}
