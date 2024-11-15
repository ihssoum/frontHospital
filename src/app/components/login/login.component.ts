import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //The ! indicates that this property will be initialized before use,
  // even though it is initially declared as undefined
  formLogin! : FormGroup ;
  errorMessage : any;

//FormBuilder (used to create the form),
// AuthService (presumably used for authentication),
// and Router (used for navigation).
  constructor(private fb: FormBuilder,
              private authService: AuthService
              ,private router : Router,
              //private dialogRef: MatDialogRef<LoginComponent>
              private dialogRef: MatDialog,
  ) {}
//this.fb.group({ ... }): This method creates a FormGroup instance with the specified form controls.
// In this case, the form has two controls: username and password,
// both initially set to empty strings.

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")

    })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authService.login(username, pwd).subscribe({
      next: data => {
      this.authService.loadProfile(data);
        if (this.authService.roles.includes('ROLE_PATIENT')) {
          this.router.navigateByUrl("listMed")
          this.closeModal();
        }
        if (this.authService.roles.includes('ROLE_SECRETAIRE')) {
          this.router.navigateByUrl("SEC/ListeRDV")
          this.closeModal();

        }
      },

      error: (err) => {
        console.log(err);
        this.errorMessage = 'Identifiants invalides. Veuillez réessayer.'; // Set error message in French
      }
    })
  }
  closeModal(){
    this.dialogRef.closeAll();
  }

}
