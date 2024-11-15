import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DemandeRdv } from '../../Models/medecinModel';
import { AuthService } from "../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { ExchangeOfDataService } from "../../services/ExchangeOfData.service";
import {limitRDVguard} from "../../guards/limitRDV.guard";
import {MatDialogRef} from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';

import {ButtonPriseRDVComponent} from "../button-prise-rdv/button-prise-rdv.component";
import {CheckNumRdvService} from "../../services/check-num-rdv.service";



@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRDVComponent implements OnInit {
  myForm!: FormGroup;
  doctorCin: string = '';
  message:string='';
  successMessage: string='';
  existingRdvMessage: string='';
  performAction: boolean = this.limitRDVguard.actionPerformed;
  appointmentLimitExceeded = false;
  appointementExceededAlert:string='';
  SelectedDateTime!:any


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private http: HttpClient,
              private router: Router,
              private exchangeOfDataService: ExchangeOfDataService,
              private limitRDVguard : limitRDVguard,
              private dialogRef: MatDialogRef<ButtonPriseRDVComponent>,
              private checkAppointmentLimitService: CheckNumRdvService



  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.exchangeOfDataService.getDoctorCin().subscribe(cin => {
      this.doctorCin = cin; // Assign value to class-level variable
    });
    this.exchangeOfDataService.getSelectedDateTime().subscribe(Date => {
      this.SelectedDateTime = Date; // Assign value to class-level variable
      console.log(this.SelectedDateTime)
    });

  }

  onSubmit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      console.log(this.doctorCin)
      this.checkAppointmentLimitService.LimitExceeded(this.doctorCin)
        .subscribe(limitExceeded => {
          if (limitExceeded) {
            this.appointmentLimitExceeded = true;
            this.appointementExceededAlert = 'Appointment limit exceeded';
          } else {
            const demandeRdv: DemandeRdv = {
              statusRDV: this.SelectedDateTime ? 1 : 0,
              Patientcin: formValue.cin,
              DRcin: this.doctorCin,
              username: this.authService.username,
              date_demande: new Date(),
              nom: formValue.nom,
              prenom: formValue.prenom,
              tel: formValue.tel,
              email: formValue.email,
              adresse: '',
              date_rdv:this.SelectedDateTime
            };

            this.http.post<any>('http://localhost:8083/priseRdvNewPatient', demandeRdv)
              .subscribe(
                (response) => {
                  console.log('Response from server:', response);
                  if (response.message === 'Rendez-vous déjà pris.') {
                    this.existingRdvMessage = response.message;
                    this.showSuccessWarning()
                  } else if (response.message === 'Rendez-vous créé avec succès.') {
                    this.successMessage = response.message;
                    this.showSuccessMessage();

                  }
                },
                (error) => {
                  console.error('Error creating appointment:', error);
                  alert('Error creating appointment. Please try again later.');
                }
              );
          }
        });
    }
  }
  showSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 2000); // 2000 milliseconds = 2 seconds
  }
  showSuccessWarning(): void {
    setTimeout(() => {
      this.existingRdvMessage = '';
    }, 2000); // 2000 milliseconds = 2 seconds
  }


}
