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
  }
  enum statusRDV {
    EnAttente,valide
  
  }