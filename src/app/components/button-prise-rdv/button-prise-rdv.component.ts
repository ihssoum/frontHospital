import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {ExchangeOfDataService} from "../../services/ExchangeOfData.service";
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-button-prise-rdv',
  templateUrl: './button-prise-rdv.component.html',
  styleUrl: './button-prise-rdv.component.css'
})
export class ButtonPriseRDVComponent implements OnInit{
  showPourSoi: boolean=true;
  showPourProche:boolean =false;
  selectedOption: string="Pour Soi";
  leftOption: string ="Pour un Proche";
  doctorCin:String='';
  doctor!:any;
  patient!:any;

  constructor(private router:Router,
              private exchangeOfDataService:ExchangeOfDataService,
              private http:HttpClient,
              private dialogRef: MatDialogRef<ButtonPriseRDVComponent>,

  ) {
  }
  ngOnInit() {
    this.exchangeOfDataService.getDoctorCin().subscribe(cin => {
      this.doctorCin = cin;
    });
    this.getDoctor()
  }

  toggleOption() {
    this.showPourSoi = !this.showPourSoi;
    this.selectedOption = this.showPourSoi ? "Pour Soi" : "Pour un Proche";
    this.leftOption =this.showPourSoi ? "Pour un Proche" : "Pour Soi"  ;
  }
  getDoctor(){
    this.http.get<any>("http://localhost:8083/doctor/" + this.doctorCin)
      .subscribe(
        (data: any[]) => {
          this.doctor = data;
        },
        (error) => {
          console.error('Error fetching doctor:', error);
        }
      );

  }

  protected readonly Math = Math;

  closeModal() {
    this.dialogRef.close();

  }
}
