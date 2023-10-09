import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnvaseService {
  private envases: any[] = [
    {
      id: 0,
      envase: {
        tipo: 'cerveza',
        color: 'verde',
        cantidad: '10u',
      },
      cajon: {
        tipo: 'quilmes',
        cantidad: '2u',
      },
    },
    {
      id: 1,
      envase: {
        tipo: 'cerveza',
        color: 'marron',
        cantidad: '8u',
      },
      cajon: {
        tipo: 'quilmes',
        cantidad: '1u',
      },
    },
    {
      id: 2,
      envase: {
        tipo: 'cerveza',
        color: 'quilmes 340',
        cantidad: '16u',
      },
      cajon: null,
    },
    {
      id: 3,
      envase: {
        tipo: 'gaseosa',
        color: null,
        cantidad: '14u',
      },
      cajon: {
        tipo: 'gaseosa',
        cantidad: '1u',
      },
    },
    {
      id: 4,
      envase: {
        tipo: 'drago',
        peso: '1kg',
        color: null,
        cantidad: '2u',
      },
      cajon: null,
    },
  ];

  private _envases: BehaviorSubject<any[]>;

  constructor() {
    this._envases = new BehaviorSubject(this.envases);
  }

  observableEnvases = (): Observable<any[]> => this._envases.asObservable();

  currentEnvases = (): any[] | undefined => this.envases;

  setEnvases = (): void => {
    this._envases.next(this.envases);
  };

  removeEnvase = (envaseObj: any) => {
    let index: number = this.envases.indexOf(envaseObj);

    this.envases.splice(index, 1);
    this._envases.next(this.envases);

    localStorage.setItem('cargaPendiente', JSON.stringify(this.envases));
  };
}
