import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';

import {Personne} from "../Models/Personne";
import {note} from "../Models/note";
import {rdvConsult} from "../Models/rdvConsult";
import {CommentAndEvaluation} from "../Models/CommentAndEvaluation";
import {Departement} from "../Models/Departement";
import {email} from "../Models/mail";
import {RdvValid} from "../Models/RdvValid";
import {consultation} from "../Models/consultation";
import {RendezVous} from "../Models/rendezvous";



@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  checkDuplicateUsername(username: string): Observable<boolean> {
    // Utilisez HttpClient pour envoyer une requête HTTP à votre backend
    // Endpoint pour vérifier si le nom d'utilisateur existe déjà
    // Adapté à votre propre implémentation de l'API backend
    return this.http.get<boolean>(this.API_URL +"/exists/"+username);
  }
  checkDuplicateCin(cin: string): Observable<boolean> {
    // Utilisez HttpClient pour envoyer une requête HTTP à votre backend
    // Endpoint pour vérifier si le nom d'utilisateur existe déjà
    // Adapté à votre propre implémentation de l'API backend/existsCin/{cin}
    return this.http.get<boolean>(this.API_URL +"/existsCin/"+cin);
  }

  readonly API_URL = 'http://localhost:8083';
  readonly ENDPOINT_RDV = "/rendez-vous";
  private cin: string | undefined;

  constructor(private http: HttpClient) {}

  getRDV(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.API_URL + this.ENDPOINT_RDV);
  }
  getNotes(cin:string,date:String):Observable<note[]>{
    return this.http.get<note[]>(this.API_URL + "/notes/"+cin+"/"+date);
  }
  saveNewNote(note:note):Observable<void> {
    return  this.http.post<void>(this.API_URL + "/notes",note);
  }
  deleteNote(id:number):Observable<void>{
    return  this.http.delete<void>(this.API_URL + "/notes/"+id);
  }
  UpdateNote(id:number,title:string):Observable<void>{
    return  this.http.put<void>(this.API_URL + "/notes/"+id,title);
  }
  getPatientDetails(idRdv:number):Observable<RendezVous> {
    return this.http.get<RendezVous>(this.API_URL+"/details/"+idRdv);
  }
  getRdvDetails(id:string):Observable<rdvConsult[]> {
    return this.http.get<rdvConsult[]>(this.API_URL+"/rendez-vous/"+id);
  }

  createConsultation(consultation: consultation): Observable<any> {
    return this.http.post(this.API_URL+"/consult",consultation);
  }
  getPatientCinByRdv(idRdv:number) :Observable<string> {
    return this.http.get<string>(this.API_URL+"/rdv/"+idRdv+"/cin");
  }


  getNomComment(id:String): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.API_URL+"/per/"+id); // Effectuer une requête HTTP GET pour récupérer les commentaires
  }
  getDep() :Observable<Departement[]> {
    return this.http.get<Departement[]>(this.API_URL+"/dep");
  }




  sendMail(verif:email):Observable<void> {

    return this.http.post<void>("http://localhost:8080/envoyerCode",verif);
  }

  getRdvPatient(username: string | undefined):Observable<RdvValid[]> {
    return this.http.get<RdvValid[]>(this.API_URL+"/patientRDV/"+username);
  }
  getRdvPatientAmis(username: string | undefined):Observable<RdvValid[]> {
    return this.http.get<RdvValid[]>(this.API_URL+"/patientRDV/amis/"+username);
  }




}




