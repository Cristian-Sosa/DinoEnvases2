import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvasesDataService {
  private envases: Envase[] = [
    {
      id: 1,
      codigo: '3110001',
      ean: '3311000100001',
      descripcion: 'Cerveza 1L (Marrón)',
      tipoEnvase: 'cerveza'
    },
    {
      id: 2,
      codigo: '3110001',
      ean: '3311000100001',
      descripcion: 'Cerveza 1L (Verde)',
      tipoEnvase: 'cerveza'
    },
    {
      id: 3,
      codigo: '3110003',
      ean: '3110003000000',
      descripcion: 'Gaseosa Linea Coca Cola 2/2.5 L',
      tipoEnvase: 'gaseosa'
    },
    {
      id: 4,
      codigo: '3110005',
      ean: '3311000500009',
      descripcion: 'Garrafa Drago 250 CC',
      tipoEnvase: 'drago'
    },
    {
      id: 5,
      codigo: '3110006',
      ean: '3311000600006',
      descripcion: 'Garrafa Drago 1 KG',
      tipoEnvase: 'drago'
    },
    {
      id: 6,
      codigo: '3110012',
      ean: '3311001200007',
      descripcion: 'Cerveza Quilmes 340 CC',
      tipoEnvase: 'cerveza'
    },
    {
      id: 7,
      codigo: '3110015',
      ean: '3311001500008',
      descripcion: 'Cajón Coca Cola 2500 CC',
      tipoEnvase: 'cajon'
    },
    {
      id: 8,
      codigo: '9999998',
      ean: '9999998123453',
      descripcion: 'Cajón Cerveza 340 CC',
      tipoEnvase: 'cajon'
    },
    {
      id: 8,
      codigo: '9999999',
      ean: '9999001321425',
      descripcion: 'Cajón Cerveza 1 Lt',
      tipoEnvase: 'cajon'
    },
  ];


  constructor() {}
}

export interface Envase {
  id: number;
  codigo: string;
  ean: string;
  descripcion: string;
  tipoEnvase: 'cerveza' | 'gaseosa' | 'drago' | 'cajon'
}
