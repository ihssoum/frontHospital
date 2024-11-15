
export interface RdvValid{

    id:number;
    nomM:string;
    prenomM:string;
    date:Date;
    numeroOrdre:number;
    typeRDV:string;
    status:statusRDV;
    dateV:Date;
    cinP:string;
    
  }

  export enum statusRDV {
    valide = 'valide',
    EnAttente = 'EnAttente'
    
  }