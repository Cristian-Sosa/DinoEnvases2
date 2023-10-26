export interface IEnvaseModel {
  id: number;
  envase: IEnvase;
  cajon?: ICajon;
}

export interface IEnvase {
  tipo: 'drago' | 'cerveza' | 'gaseosa';
  peso?: '1kg' | '250g';
  color?: 'verde' | 'marron' | 'quilmes 340';
  cantidad: number | string;
}

export interface ICajon {
  tipo: 'quilmes' | 'cia' | 'quilmes 340' | 'gaseosa';
  cantidad: string;
}
