import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inscription } from '../../Models/inscription';
import { RendezVousService } from '../../services/rendez-vous.service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit{

closeModal() {
throw new Error('Method not implemented.');
}
verificationCode: any;
showModal: any;
submitVerificationCode() {
throw new Error('Method not implemented.');
}

 correct?:number;
  inscriptionForm !: FormGroup;
  showVerificationCodeInput: boolean = false;
  constructor(private fb: FormBuilder,
     private rs:RendezVousService,
     private router: Router,
     private http: HttpClient) {
  }
  passwordsMatch: boolean = true;
  validEmail: boolean = true;
  userValid: boolean = false;
  cinValid: boolean = false;
  demande?:inscription;
  verif: any = {};


  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      cin: ['', Validators.required],
      nom: ['',],
      prenom: ['', ],
      tel: ['', Validators.required],
      dateN: ['',],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      username: ['', Validators.required],
      mdp: ['', Validators.required],
      repeatPassword: ['', Validators.required]
      // vous devrez peut-être définir des validateurs spécifiques pour ce champ
    });
  }

  checkDuplicateUsername() {
    console.log("check username")
    const username = this.inscriptionForm.get('username')?.value;
    this.rs.checkDuplicateUsername(username).subscribe((exists: boolean) => {
      if (exists) {
        this.userValid=true;
        this.inscriptionForm.get('username')?.setErrors({ duplicateUsername: true });
      }
      else{
        this.userValid=false;
      }
    });
    console.log(this.userValid)
  }

  checkDuplicateCin() {
    console.log("check cin")
    const username = this.inscriptionForm.get('cin')?.value;
    this.rs.checkDuplicateCin(username).subscribe((exists: boolean) => {
      if (exists) {
        this.cinValid=true;
        this.inscriptionForm.get('cin')?.setErrors({ duplicateUsername: true });
      }
      else{
        this.cinValid=false;
      }
    });
    console.log(this.userValid)
  }
  checkPasswordMatch() {
    // Vérifier si inscriptionForm est null
    if (this.inscriptionForm) {
      const password =this.inscriptionForm.get("mdp")?.value;
      const repeatPassword = this.inscriptionForm.get("repeatPassword")?.value;

      this.passwordsMatch = password == repeatPassword;
      console.log(this.passwordsMatch);


    }
  }
  verifierInscription() {
    this.demande=this.inscriptionForm.value;
    if (this.verif) {
      this.verif.to=this.demande?.email;
      this.verif.codeVerification = Math.floor(Math.random() * 1000000);
    }
    console.log(this.verif.codeVerification);
    console.log(this.verif.to);
    //this.rs.sendMail(this.verif);
    this.http.post<void>("http://localhost:8083/envoyerCode", this.verif)
    .subscribe(
      () => {
        console.log('Requête envoyée avec succès !');
        this.showVerificationCodeInput = true;
        this.showModal = true;
        console.log(this.showVerificationCodeInput);
        this.router.navigate(['/verification'], { state: { demande: this.demande, verif: this.verif } });
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de la requête : ', error);
      }
    );
    }
    customEmailValidator(control: any) {
      if (!control.value.includes('@')) {
        return { invalidEmail: true };
      }
      return null;
    }
    checkEmail() {
      const emailControl = this.inscriptionForm.get('email');
      if (emailControl) {
        const email = emailControl.value;
        if (email && !email.includes('@')) {
          console.log("mahoach")
          this.validEmail=false
          emailControl.setValue(email); // Définir la valeur de l'e-mail pour déclencher les validations
          emailControl.setErrors({ 'invalidEmail': true }); // Définir les erreurs du formulaire
        }
        else{
          this.validEmail=true;
        }
      }
    }




}
