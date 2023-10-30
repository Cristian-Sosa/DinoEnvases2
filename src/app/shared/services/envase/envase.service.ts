import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEnvaseTransfer } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class EnvaseService {
  private envaseTemp: IEnvaseTransfer;
  private _envaseTemp: BehaviorSubject<IEnvaseTransfer>;

  constructor() {
    this.envaseTemp = {
      TipoEnvase: {
        Nombre: '',
        Tipo: '',
      },
      Unidades: 0,
      contenido: '',
    };
    this._envaseTemp = new BehaviorSubject(this.envaseTemp);
  }

  setNombreEnvase = (
    nombreEnvase: 'drago' | 'cerveza' | 'gaseosa' | 'cajon'
  ): void => {
    this.envaseTemp.TipoEnvase.Nombre = nombreEnvase;
    this.nextObservable();
  };
  setTipoEnvase = (
    tipoEnvase:
      | 'Verde'
      | 'Marrón'
      | 'Quilmes 340'
      | 'Coca Cola'
      | 'Quilmes Verde'
      | 'Quilmes Marrón'
      | 'CIA Verde'
      | 'CIA Marrón'
  ): void => {
    this.envaseTemp.TipoEnvase.Tipo = tipoEnvase;
    this.nextObservable();
  };
  setUnidades = (unidades: number): void => {
    this.envaseTemp.Unidades = unidades;
    this.nextObservable();
  };
  setContenido = (
    contenido: '1l' | '330ml' | '250g' | '2kg' | '2l' | '2.5l'
  ): void => {
    this.envaseTemp.contenido = contenido;
    this.nextObservable();
  };

  nextObservable = (): void => {
    this._envaseTemp.next(this.envaseTemp);
  };

  resetEnvase = (): void => {
    this.envaseTemp = {
      TipoEnvase: {
        Nombre: '',
        Tipo: '',
      },
      Unidades: 0,
      contenido: '',
    };
    this.nextObservable();
  };

  getEnvaseObservable = (): Observable<IEnvaseTransfer> =>
    this._envaseTemp.asObservable();
}
