import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AccessURLEvaluationGuard} from "../../guards/ControlUrlAccess.guard";
import {ExchangeOfDataService} from "../../services/ExchangeOfData.service";
import {FormControl} from "@angular/forms";
import {Component, OnInit,ViewEncapsulation} from "@angular/core";
import {map, Observable,startWith} from "rxjs";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ButtonPriseRDVComponent} from "../button-prise-rdv/button-prise-rdv.component";
import {AuthService} from "../../services/auth.service";
import {LoginComponent} from "../login/login.component";



@Component({
  selector: 'app-liste-medecin',
  templateUrl: './liste-medecin.component.html',
  styleUrl: './liste-medecin.component.css',
  encapsulation: ViewEncapsulation.None

})
export class ListeMedecinComponent implements OnInit {
  doctors!: any[]
  message!:string;
  originalDoctors: any[] = [];
  cin!:string;
  prenom!:string;
  value!:string;
  searchTerm = new FormControl('');
  protected readonly Math = Math;
  filteredOptions!: Observable<any>;
  noResultsFound: boolean = false;
  p:number=1;
  itemsPerPage:number=10;
  totalPages!:number;
  successMessage: any='';
   deptNames: any;

  constructor(
    private router : Router,
    private http: HttpClient,
    private accessURLEvaluationGuard:AccessURLEvaluationGuard,
    private ExchangeOfDataService:ExchangeOfDataService,
    public dialog: MatDialog,
    private authService:AuthService,
  ) {
  }

  ngOnInit() {
    this.noResultsFound = false;
    searchTerm: new FormControl('')
    this.filteredOptions = this.searchTerm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.fetchMedecins();


  }
  prendreRendezVous(cin:string) {
    this.cin=cin;
    this.ExchangeOfDataService.setDoctorCin(cin);
   this.checkAuthenticationAndLimit();
    console.log("salam rssk ki lqalam"+this.ExchangeOfDataService.getDoctorCin());


  }

 fetchMedecins() {
    this.doctors = [];
    this.http.get<any[]>('http://localhost:8083/ListDoctors')
      .subscribe(
        (data: any[]) => {
          this.originalDoctors = data;
          this.doctors = [...this.originalDoctors];
          this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);

        },
        (error) => {
          console.error('Error fetching rendezvous:', error);
        }
      );
  }

  ratings(cin:string) {
    this.cin=cin;
    this.ExchangeOfDataService.setDoctorCin(cin);
    //this.accessURLEvaluationGuard.performAction();
    this.router.navigateByUrl("comment");
    console.log("naynay"+this.ExchangeOfDataService.getDoctorCin())


  }

  searchMedecin() {
    const fullName = this.searchTerm.value;
    if (fullName) {
      const nom = fullName.split(' ')[1]; // Split by space and take the first part
      this.http.get<any[]>('http://localhost:8083/searchDoctor/' + nom)
        .subscribe(
          (data: any[]) => {
            this.doctors = data;
            this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
            this.noResultsFound = this.doctors.length === 0;


          },
          (error) => {
            console.error('Error finding doctor:', error);
            console.log(this.searchTerm)
          }
        );
    }
  }




  private _filter(value: string | null): any[] {
    if (!value) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.originalDoctors.filter(doctor =>
      doctor.nom.toLowerCase().startsWith(filterValue) || doctor.prenom.toLowerCase().startsWith(filterValue)
    );
  }

  checkAppointmentLimit() {
    if (this.cin) {
      this.http.post<number>('http://localhost:8083/nbrRDV', { cin: this.cin, username: this.authService.username, date_demande: new Date() })
        .subscribe(
          (response) => {
            if (response < 2) {
              console.log("true");
              const dialogConfig = new MatDialogConfig();
              dialogConfig.width = '640px'; // Set the width
              dialogConfig.height = '500px'; // Set the height
              this.dialog.open(ButtonPriseRDVComponent, dialogConfig);

            } else {
              console.log("false");
              this.message='Vous avez atteint la limite des rendez-vous possibles à prendre dans une même journée.'
              this.router.navigateByUrl("/listMed");
            }
          },
          (error) => {
            console.error('Error checking number of appointments:', error);
            this.router.navigateByUrl("/listMed"); // Handle error by redirecting to another page
          }
        );
    }
  }
  checkAuthenticationAndLimit() {
    console.log(this.authService.isAuthenticated)
    if (this.authService.isAuthenticated) {
      this.checkAppointmentLimit() ;

    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '360px'; // Set the width
      dialogConfig.height = '370px'; // Set the height
      this.dialog.open(LoginComponent, dialogConfig);

    }
  }
  removeAlert() {
    this.message = '';

  }

  fetchAllDepts() {
    this.http.get<any>('http://localhost:8083/getAllDept').subscribe(
      (response) => {
        console.log(response);
        this.deptNames = response;
      },
      (error) => {
        console.error('Error fetching departments:', error); // Log the error for debugging
      }
    );
  }

  onClickOption(dept: any) {
    this.http.get<any>(`http://localhost:8083/doctorByDept/`+dept)
      .subscribe(
        (response)=>{
          this.doctors = response;
        },
        (error) => {
          console.error('Error fetching departments:', error); // Log the error for debugging
        }
      );
  }
}
