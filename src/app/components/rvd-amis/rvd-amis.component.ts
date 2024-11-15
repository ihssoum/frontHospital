import { Component, OnInit } from '@angular/core';
import { RdvValid } from '../../Models/RdvValid';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { RendezVousService } from '../../services/rendez-vous.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-rvd-amis',
  templateUrl: './rvd-amis.component.html',
  styleUrl: './rvd-amis.component.css'
})
export class RvdAmisComponent implements OnInit{
  ReporterRdv(id: number) {
    console.log("reporter");
    this.http.put<any>("http://localhost:8083/reporter/"+id,null)
      .subscribe(
        () => {
          console.log("Requête PUT exécutée avec succès !");

          this.rdvAmis$ = this.rs.getRdvPatientAmis(this.authService.username);
        },
        (error) => {
          console.error("Une erreur s'est produite lors de l'exécution de la requête PUT :", error);
        }
      );
  }

AnnulerRdv(id: number) {
  console.log("annuler");
  this.http.delete<any>("http://localhost:8083/annuler/"+id)
    .subscribe(
      () => {
        console.log("Requête PUT exécutée avec succès !");

        this.rdvAmis$ = this.rs.getRdvPatientAmis(this.authService.username);
      },
      (error: any) => {
        console.error("Une erreur s'est produite lors de l'exécution de la requête PUT :", error);
      }
    );
}
  rdv$: Observable<RdvValid[]> | undefined; // Déclarez rdv$ comme un observable
  rdvAmis$: Observable<RdvValid[]> | undefined;

  constructor(private http: HttpClient,private authService: AuthService, private rs: RendezVousService) {}

  ngOnInit(): void {

    this.rdvAmis$ = this.rs.getRdvPatientAmis(this.authService.username);
    console.log(this.rdvAmis$) // Affectez l'observable retourné par getRdvPatient à rdv$
  }

}