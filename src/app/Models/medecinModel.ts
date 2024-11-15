export interface medecin{
  cin:string;
}
export interface patient{
  cinDR:string;
  cinPatient:string;
  statusRDV:string;

}
export interface rendezvous{
  cinDR:string;
  cinPatient:string;
  statusRDV:string;
  idCompte:number;

}

export interface DemandeRdv {
  statusRDV: statusRDV;
  Patientcin: string;
  DRcin: string;
  username: string;
  date_demande: Date;
  nom: string;
  prenom: string;
  tel: number;
  email: string;
  adresse: string;
  date_rdv:any;
}
export interface DemandeRdvPatientExist {
  statusRDV: statusRDV;
  Patientcin: string;
  DRcin: string;
  username: string;
  date_demande: Date;
  date_rdv:any;

}
enum statusRDV {
  EnAttente,valide

}
export interface CommentEtEvaluation {
  username: string ;
  evaluation : number ;
  commentaire : string ;
  DRcin: string;
}
export interface Patient {
  nom: string;
  prenom: string;
}


