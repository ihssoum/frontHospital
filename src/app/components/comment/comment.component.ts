import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommentAndEvaluation} from "../../Models/CommentAndEvaluation";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CommonModule, NgForOf} from '@angular/common';



import {ExchangeOfDataService} from "../../services/ExchangeOfData.service";
import { RendezVousService } from '../../services/rendez-vous.service';

import {AsyncPipe} from "@angular/common";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgbRating,
    NgForOf
  ],
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  [x: string]: any;

  list: CommentAndEvaluation[] = [];
  myForm!: FormGroup;
  rating = 0;
  doctorCin: string = '';


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private http: HttpClient,
              private router :Router,
              private rs:RendezVousService,
              private ExchangeOfDataService:ExchangeOfDataService
  ) {

  }

  ngOnInit(): void {
    console.log("username:"+this.authService.username)
    this.myForm = this.fb.group({
      cin: ['', Validators.required]

      // vous devrez peut-être définir des validateurs spécifiques pour ce champ
    });
    this.myForm = this.fb.group({
      rating: [null, Validators.required],
      comment: [null, Validators.required]
    });

    // this.route.queryParams.subscribe(params => {
    // this.doctorCin = params['cin'];
    this.ExchangeOfDataService.getDoctorCin().subscribe(cin => {
      this.doctorCin = cin;
      console.log("Doctor Cin received:", this.doctorCin);

    });
    this.getComments();


  }
  getComments(): void {
    console.log( "nerry nerry bak chibani "+this.doctorCin)
    this.http.get<any>('http://localhost:8083/Rec/'+ this.doctorCin)
      .subscribe(
        (data: any) => {
          this.list = data;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );

  }

  setRating(value: number) {
    this.rating = value;
  }

  onSubmit() {
    const formValue = this.myForm.value;
    const commentEtEvaluation: CommentAndEvaluation = {
      username: this.authService.username,
      evaluation: this.rating,
      commentaire: formValue.comment,
      DRcin: this.doctorCin,
      nom:"",
      prenom:""
    };

    console.log("rr"+this.myForm.value.comment);
    this.http.post<any>('http://localhost:8083/evaluation', commentEtEvaluation)
      .subscribe(response => {
        console.log('Data sent to the backend successfully!');
        console.log(this.doctorCin);
        console.log(commentEtEvaluation.username)
        this.getComments();
      }, error => {
        console.error('Error sending data to the backend:', error);
      });
    this.getComments();
  }
}
