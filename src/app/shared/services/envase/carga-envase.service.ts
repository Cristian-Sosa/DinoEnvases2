import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEnvaseTransfer } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CargaEnvaseService {
  private envases: IEnvaseTransfer[] = [
    {
      TipoEnvase: {
        Nombre: 'cerveza',
        Tipo: 'Verde'
      },
      Unidades: 2,
      contenido: '1l'
    },
    {
      TipoEnvase: {
        Nombre: 'gaseosa',
        Tipo: 'Coca Cola'
      },
      Unidades: 6,
      contenido: '2.5l'
    },
    {
      TipoEnvase: {
        Nombre: 'gaseosa',
        Tipo: 'Coca Cola'
      },
      Unidades: 4,
      contenido: '2l'
    },
  ];
  private _envases: BehaviorSubject<any[]>;

  private StaticData: any = {
    tipoEnvase: {
      nombre: [
        { id: 'cerveza', title: 'Cerveza', name: 'envase' },
        { id: 'gaseosa', title: 'Gaseosa', name: 'envase' },
        { id: 'drago', title: 'Drago', name: 'envase' },
        { id: 'cajon', title: 'Cajón', name: 'cajon' },
      ],
      tipo: {
        cerveza: [
          { value: 'verde', description: 'Verde' },
          { value: 'marron', description: 'Marrón' },
        ],
        gaseosa: [{ value: 'coca-cola', description: 'Coca Cola' }],
        drago: [
          { value: 'drago-500', description: 'Drago 500g' },
          { value: 'drago-2', description: 'Drago 2kg' },
        ],
        cajones: [
          { value: 'coca-cola', description: 'Coca Cola' },
          { value: 'cia-verde', description: 'CIA Verde' },
          { value: 'cia-marron', description: 'CIA Verde' },
          { value: 'quilmes-verde', description: 'Quilmes Verde' },
          { value: 'quilmes-marron', description: 'Quilmes Marrón' },
          { value: 'quilmes-340', description: 'Quilmes 340' },
        ],
      },
      contenido: {
        cerveza: ['1l', '330ml'],
        gaseosa: ['2l', '2.5l'],
        drago: ['500g', '2kg'],
      },
    },
  };

  constructor() {
    this._envases = new BehaviorSubject(this.envases);
  }

  observableEnvases = (): Observable<any[]> => this._envases.asObservable();

  currentEnvases = (): any[] | undefined => this.envases;

  setEnvases = (envase: any): void => {
    this.envases.push(envase);
    this._envases.next(this.envases);
  };

  removeEnvase = (envaseObj: any): void => {
    let index: number = this.envases.indexOf(envaseObj);

    this.envases.splice(index, 1);
    this._envases.next(this.envases);

    localStorage.setItem('cargaPendiente', JSON.stringify(this.envases));
  };

  checkCargaPendiente = (): void => {
    if (localStorage.getItem('cargaPendiente')) {
      this.envases = JSON.parse(localStorage.getItem('cargaPendiente')!);
      this._envases.next(this.envases);
    }
  };

  getStaticData = (): any => this.StaticData
}
