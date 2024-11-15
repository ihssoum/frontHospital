import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExchangeOfDataService } from '../../services/ExchangeOfData.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],

})
export class DatesComponent implements OnInit {
  doctorCin: string = '';
  groupedDates: any = [];
  groupedHours: any = [];
  lastClickedHour: any;
  currentPageHours: number=1;
  currentPageDays: number=1;
  selectedHour!: any
  selectedDay!: any;

  totalPages:any ;
  itemsPerPage: number=5;


  constructor(private http: HttpClient, private exchangeOfDataService: ExchangeOfDataService) { }

  ngOnInit(): void {
    this.exchangeOfDataService.getDoctorCin().subscribe(cin => {
      this.doctorCin = cin;
      console.log("Doctor Cin received:", this.doctorCin);
     this.getAvailableDates();


    });
  }
  getAvailableDates( ): void {
    this.http.get<any>('http://localhost:8083/appointments/AvailableDates/' + this.doctorCin).subscribe(data => {
      this.groupedDates=data;
      this.totalPages = Math.ceil(this.groupedDates.length / this.itemsPerPage);

    });
  }

  showAvailableHours(day: any) {
    this.http.get<any[]>(`http://localhost:8083/appointments/AvailableHours/${this.doctorCin}/${day}`).subscribe(
      (data: any[]) => {
        this.groupedHours=data;
        this.selectedDay=day
        console.log(data)
      });
  }


  toggleButtonColor(hour: any) {
    if (this.lastClickedHour) {
      this.lastClickedHour.clicked = false;
    }
    hour.clicked = true;
    this.lastClickedHour = hour;
  }

  selectedTime(hour: any) {
    this.selectedHour=hour
    this.exchangeOfDataService.setSelectedDateTime(this.selectedDay,hour)
  }

}
