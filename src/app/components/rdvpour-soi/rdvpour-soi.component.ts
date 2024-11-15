import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ExchangeOfDataService} from "../../services/ExchangeOfData.service";
import {DemandeRdv, DemandeRdvPatientExist} from "../../Models/medecinModel";

@Component({
  selector: 'app-rdvpour-soi',
  templateUrl: './rdvpour-soi.component.html',
  styleUrl: './rdvpour-soi.component.css'
})
export class RDVpourSoiComponent implements OnInit {

  doctorCin: string = '';
  patient: any = '';
  existingRdvMessage!: string;
  successMessage!: string;
  SelectedDateTime!: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private exchangeOfDataService: ExchangeOfDataService
  ) {
  }

  ngOnInit(): void {
    this.getPatientInfo();
    this.exchangeOfDataService.getDoctorCin().subscribe(cin => {
      this.doctorCin = cin;
    });
    this.exchangeOfDataService.getSelectedDateTime().subscribe(Date => {
      this.SelectedDateTime = Date; // Assign value to class-level variable
      console.log(this.SelectedDateTime)
    });

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


  onSubmit() {
    const demandeRdv: DemandeRdvPatientExist = {
      statusRDV: this.SelectedDateTime ? 1 : 0,
      Patientcin: this.patient.cin,
      DRcin: this.doctorCin,
      username: this.authService.username,
      date_demande: new Date(),
      date_rdv:this.SelectedDateTime


    };


    this.http.post<any>('http://localhost:8083/priseRdvPatientExist', demandeRdv)
      .subscribe(
        (response) => {
          console.log('Response from server:', response);
          if (response.message === 'Rendez-vous déjà pris.') {
            this.existingRdvMessage = response.message;
          } else if (response.message === 'Rendez-vous créé avec succès.') {
            this.successMessage = response.message;
          }
        },
        (error) => {
          console.error('Error creating appointment:', error);
          alert('Error creating appointment. Please try again later.');
        }
      );

  }
}
