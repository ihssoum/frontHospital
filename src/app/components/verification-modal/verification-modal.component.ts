import { Component, OnInit } from '@angular/core';
import { inscription } from '../../Models/inscription';
import { ActivatedRoute, Router } from '@angular/router';
import { email } from '../../Models/mail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verification-modal',
  templateUrl: './verification-modal.component.html',
  styleUrl: './verification-modal.component.css'
})
export class VerificationModalComponent implements OnInit {
  isSuccess:boolean=false;
  successClicked: boolean = false;

ajouterPatient() {
  this.successClicked=true;
  if(this.verifForm.value.codeVerif == this.verif.codeVerification){
    console.log("shih");
    this.http.post<void>("http://localhost:8083/compte", this.demande)
    .subscribe(
      () => {
        console.log("La demande a été envoyée avec succès !");
        this.isSuccess = true;
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'envoi de la demande :", error);
      }
    );
    this.isSuccess=true;

  }
  else{
    console.log("faux");
   this.isSuccess
  }

}


  constructor(private http: HttpClient,private fb: FormBuilder,private route: ActivatedRoute, private router: Router) { }
  verifForm !: FormGroup;
  demande?:inscription;
  verif: email= {
    to: 'h',
    codeVerification: 0
  };

  ngOnInit(): void {
    this.verifForm = this.fb.group({
      codeVerif: ['', Validators.required]
      // vous devrez peut-être définir des validateurs spécifiques pour ce champ
    });
    const state = history.state;
    if (state) {
      this.demande = state.demande;
      this.verif = state.verif;
      console.log("Données récupérées avec succès :", this.demande, this.verif);
    } else {
      console.log("Aucune donnée trouvée dans l'état de l'historique de navigation.");
    }
  }



}
