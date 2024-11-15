import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeOfDataService {
  private cinSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedDateTimeSubject: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);

  setDoctorCin(cin: string) {
    this.cinSubject.next(cin);
  }

  getDoctorCin(): Observable<string> {
    return this.cinSubject.asObservable();
  }

  setSelectedDateTime(selectedDay: any, hour: any) {
    if (!selectedDay || !hour) {
      this.selectedDateTimeSubject.next(null);
      return;
    }
    const [year, month, day] = selectedDay.split('-').map(Number);
    const [hourNum, minuteNum] = hour.split(':').map(Number);
    const selectedDateTime = new Date(year, month - 1, day, hourNum, minuteNum);
    this.selectedDateTimeSubject.next(selectedDateTime);
  }



  getSelectedDateTime(): Observable<Date | null> {
    return this.selectedDateTimeSubject.asObservable();
  }
}


