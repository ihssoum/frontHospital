import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AdminTemplateComponent} from "./components/admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {SecretaireTemplateComponent} from "./components/secretaire-template/secretaire-template.component";
import {ListeRDVComponent} from "./components/liste-rdv/liste-rdv.component";
import {ListeMedecinComponent} from "./components/liste-medecin/liste-medecin.component";
import {limitRDVguard} from "./guards/limitRDV.guard";
import {AccessURLEvaluationGuard} from "./guards/ControlUrlAccess.guard";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ButtonPriseRDVComponent} from "./components/button-prise-rdv/button-prise-rdv.component";
import {LoginContainerComponent} from "./components/login-container/login-container.component";
import {DatesComponent} from "./components/dates/dates.component";
import {FirstPageComponent} from "./components/first-page/first-page.component";
import {CommentComponent} from "./components/comment/comment.component";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {VerificationModalComponent} from "./components/verification-modal/verification-modal.component";
import {RvdAmisComponent} from "./components/rvd-amis/rvd-amis.component";
import {PatientRDVComponent} from "./components/patient-rdv/patient-rdv.component";

const routes: Routes = [
  {path : "inscription", component : InscriptionComponent},

  {path:"accueil",component:FirstPageComponent},
  {path : "login", component : LoginContainerComponent},
  { path: "SEC/ListeRDV", component: SecretaireTemplateComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { role: "SECRETAIRE" } },
  {path:"listMed",component:ListeMedecinComponent },
  {path : "", redirectTo : "/accueil", pathMatch :"full"},
  {path : "Dates", component : DatesComponent},
  {path : "RDV", component : ButtonPriseRDVComponent},
  {path : "comment", component : CommentComponent},
  { path: 'verification', component: VerificationModalComponent },
  {path : "patientRDV", component : PatientRDVComponent},
  {path : "AmisRDV" , component : RvdAmisComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
