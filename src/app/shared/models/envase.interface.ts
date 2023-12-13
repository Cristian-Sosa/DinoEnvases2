export interface EnvaseDTO {
  envaseId: number | null;
  tipoEnvaseId: number | null;
  cantidad: number | null;
}

export interface Envase {
  id: number;
  codigo: string;
  descripcion: string;
  ean: string;
  precio?: number;
  tipoEnvaseID: number;
  cantidades?: number;
}

export interface TipoEnvase {
  id: number;
  nombre: 'cerveza' | 'gaseosa' | 'drago' | 'cajón';
  habilitado: boolean;
}

export interface IEnvaseResponse {
  status: number;
  data: Envase[] | null;
}


export interface IVale {
    NombreSucursal: string;
    nroVale:        string;
    items:          Envase[];
}