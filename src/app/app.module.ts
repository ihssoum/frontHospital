import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { SecretaireTemplateComponent } from './components/secretaire-template/secretaire-template.component';
import { ListeMedecinComponent } from './components/liste-medecin/liste-medecin.component';
import { ListeRDVComponent } from './components/liste-rdv/liste-rdv.component';
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CdkOverlayOrigin} from '@angular/cdk/overlay';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {MatListModule} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {NgxPaginationModule} from "ngx-pagination";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { ButtonPriseRDVComponent } from './components/button-prise-rdv/button-prise-rdv.component';
import { RDVpourSoiComponent } from './components/rdvpour-soi/rdvpour-soi.component';
import {MatMenuModule} from "@angular/material/menu";
import { LoginContainerComponent } from './components/login-container/login-container.component';
import { DatesComponent } from './components/dates/dates.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FirstPageComponent } from './components/first-page/first-page.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/moment";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {VerificationModalComponent} from "./components/verification-modal/verification-modal.component";
import {RvdAmisComponent} from "./components/rvd-amis/rvd-amis.component";
import {PatientRDVComponent} from "./components/patient-rdv/patient-rdv.component";
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminTemplateComponent,
    SecretaireTemplateComponent,
    ListeRDVComponent,
    ListeMedecinComponent,
    NavbarComponent,
    ButtonPriseRDVComponent,
    RDVpourSoiComponent,
    LoginContainerComponent,
    DatesComponent,
    FirstPageComponent,
    InscriptionComponent,
    VerificationModalComponent,
    RvdAmisComponent,
    PatientRDVComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbRating,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    AsyncPipe,
    BrowserAnimationsModule,
    MatFormFieldModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatListModule,
    MatDivider,
    MatMenuModule,
    NgxPaginationModule,
    MatDialogModule,
    CommonModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),


  ],
  providers: [
    provideClientHydration(),
    {provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
