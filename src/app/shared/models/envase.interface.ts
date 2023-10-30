export interface IEnvaseModel {
  envase: IEnvase;
  unidad: number;
  peso?: number;
}

export interface IEnvase {
  tipo: 'drago' | 'cerveza' | 'gaseosa' | 'cajon';
  peso?: '1kg' | '250g';
  color?: 'verde' | 'marron' | 'quilmes 340';
  cantidad: number | string;
}

export interface ICajon {
  tipo: 'quilmes' | 'cia' | 'quilmes 340' | 'gaseosa';
  cantidad: string;
}

export interface IEnvaseTransfer {
  TipoEnvase: {
    Nombre: 'drago' | 'cerveza' | 'gaseosa' | 'cajon' | '';
    Tipo:
      | 'Verde'
      | 'Marrón'
      | 'Quilmes 340'
      | 'Coca Cola'
      | 'Quilmes Verde'
      | 'Quilmes Marrón'
      | 'CIA Verde'
      | 'CIA Marrón'
      | '';
  };
  Unidades: number;
  contenido: '1l' | '330ml' | '250g' | '2kg' | '2l' | '2.5l' | '';
}
