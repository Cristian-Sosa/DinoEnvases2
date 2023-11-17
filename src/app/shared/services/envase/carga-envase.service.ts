import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargaEnvaseService {
  private envaseTemp: any = {};

  private envases: any[] = [];
  private _envases: BehaviorSubject<any[]>;

  private StaticData: any = {
    tipoEnvase: {
      nombre: [
        { id: 'cerveza', title: 'Cerveza', name: 'envase' },
        { id: 'gaseosa', title: 'Gaseosa', name: 'envase' },
        { id: 'drago', title: 'Drago', name: 'envase' },
        { id: 'cajon', title: 'Cajón', name: 'envase' },
      ],
      tipo: {
        cerveza: [
          { value: 'verde', description: 'Verde' },
          { value: 'marron', description: 'Marrón' },
          { value: 'quilmes-340', description: 'Quilmes 340' },
        ],
        gaseosa: [{ value: 'coca-cola', description: 'Coca Cola 2 / 2.5l' }],
        drago: [
          { value: 'drago-250', description: 'Drago 250g' },
          { value: 'drago-1', description: 'Drago 1kg' },
        ],
        cajones: [
          { value: 'coca-cola', description: 'Coca Cola 2 / 2.5l' },
          { value: 'cia-verde', description: 'Indust. Cervecera  (Verde)' },
          { value: 'cia-marron', description: 'Indust. Cervecera  (Marrón)' },
          { value: 'quilmes-verde', description: 'Quilmes (Verde)' },
          { value: 'quilmes-marron', description: 'Quilmes (Marrón)' },
          { value: 'quilmes-340', description: 'Quilmes 340' },
        ],
      },
      contenido: {
        cerveza: ['1l', '330ml'],
        gaseosa: ['2l', '2.5l'],
        drago: ['250g', '1kg'],
      },
    },
  };

  constructor() {
    this._envases = new BehaviorSubject(this.envases);
  }

  observableEnvases = (): Observable<any[]> => {
    this.checkCargaPendiente();
    return this._envases.asObservable();
  };

  currentEnvases = (): any[] | undefined => this.envases;

  setEnvases = (envase: any): void => {
    this.envases.push(envase);
    this._envases.next(this.envases);

    localStorage.setItem('carga', JSON.stringify(this.envases));
  };

  removeEnvase = (envaseObj: any): void => {
    let index: number = 0;

    for (let i = 0; i < this.envases.length; i++) {
      const element = this.envases[i];
      if (
        element.cardEnvase.nombre == envaseObj.nombre &&
        element.cardEnvase.tipo == envaseObj.tipo &&
        element.cardEnvase.cantidad == envaseObj.cantidad
      ) {
        index = i;
      }
    }
    this.envases.splice(index, 1);
    this._envases.next(this.envases);

    localStorage.setItem('carga', JSON.stringify(this.envases));
  };

  checkCargaPendiente = (): boolean => {
    if (localStorage.getItem('carga')) {
      this.envases = JSON.parse(localStorage.getItem('carga')!);
      this._envases.next(this.envases);
      return true;
    }
    return false;
  };

  getTipoEnvases = (): any => this.StaticData.tipoEnvase.tipo;

  getNombreEnvases = (): any => this.StaticData.tipoEnvase.nombre;

  getContenidoEnvases = (): any => this.StaticData.tipoEnvase.contenido;

  setEnvase = (envaseDTO: any): void => {
    this.envaseTemp = {
      envaseDTO: {
        envase: envaseDTO['nombre'],
        tipoEnvase: envaseDTO['tipo'],
        cantidad: envaseDTO['cantidad'],
      },
      cardEnvase: {
        nombre: envaseDTO['nombre'],
        tipo: envaseDTO['tipo'],
        cantidad: envaseDTO['cantidad'],
      },
    };

    this.setContenidoEnvase(envaseDTO.tipo);
  };

  setContenidoEnvase = (tipo: string): void => {
    let propiedadTemp: any = {};

    switch (tipo) {
      case 'Marrón':
        propiedadTemp = { contenido: this.getContenidoEnvases().cerveza[0] };
        break;
      case 'Verde':
        propiedadTemp = { contenido: this.getContenidoEnvases().cerveza[0] };
        break;
      case 'Drago 250g':
        propiedadTemp = { contenido: this.getContenidoEnvases().drago[0] };
        break;
      case 'Drago 1kg':
        propiedadTemp = { contenido: this.getContenidoEnvases().drago[1] };
        break;
      case 'Coca Cola 2 / 2.5l':
        propiedadTemp = { contenido: this.getContenidoEnvases().gaseosa[0] };
        break;
      case 'Quilmes 340':
        propiedadTemp = { contenido: this.getContenidoEnvases().cerveza[1] };
        break;

      default:
        propiedadTemp = { contenido: this.getContenidoEnvases().gaseosa[0] };
        break;
    }

    Object.assign(this.envaseTemp.envaseDTO, propiedadTemp);

    this.setEnvases(this.envaseTemp);
  };
}
