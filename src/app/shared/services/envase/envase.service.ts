import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEnvase } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class EnvaseService {
  private envaseTemp: IEnvase | null = null;
  private _envaseTemp: BehaviorSubject<IEnvase | null>;

  constructor() {
    this._envaseTemp = new BehaviorSubject(this.envaseTemp);
  }

  setEnvaseTemp = (envase: IEnvase): void => {
    this.envaseTemp = envase;
    this._envaseTemp.next(this.envaseTemp);
  };
}
