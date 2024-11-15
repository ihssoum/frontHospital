import {Component, NgIterable} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-secretaire-template',
  templateUrl: './secretaire-template.component.html',
  styleUrls: ['./secretaire-template.component.css']
})
export class SecretaireTemplateComponent {
  rendezVousList!: any[];
  private loading!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  fetchRendezVous() {
    const username = this.authService.username;
    this.rendezVousList = []; // Clear the existing list
    this.loading = true;
    this.http.get<any[]>('http://localhost:8083/SEC/RdvBySec/' + username)
      .subscribe(
        (data: any[]) => {
          this.rendezVousList = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching rendezvous:', error);
          this.loading = false;
        }
      );
  }

  logout() {
this.authService.Logout() }
}
