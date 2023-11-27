import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsuario } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: IUsuario | undefined = undefined;
  private _usuario: BehaviorSubject<IUsuario | undefined> = new BehaviorSubject(
    this.usuario
  );

  private http = inject(HttpClient);

  // Obtener usuario desde API
  getUser = (usuario: IUsuario): Observable<any> => {
    return this.http.get<any>('urlAPI');
  };

  // Validar formulario auth
  userValidation = (usuario: IUsuario): boolean => {
    let tempUser: IUsuario | undefined = {
      Usuario: usuario.Usuario,
      Password: usuario.Password,
      Sucursal: usuario.Sucursal,
    };

    // this.getUser(usuario).subscribe((res) => (tempUser = res));

    if (tempUser.Usuario === 'csosa' && tempUser.Password === '123') {
      localStorage.setItem('userData', JSON.stringify(tempUser));
      this.usuario = tempUser;
      this._usuario.next(this.usuario);
      return true;
    } else {
      return false;
    }
  };

  clearUser = () => localStorage.removeItem('userData');

  getDataUser = (): IUsuario => {
    if (this.usuario) {
      return this.usuario;
    } else {
      return JSON.parse(localStorage.getItem('userData')!).Usuario
    }
  };

  getUsuarioLogged = (): string => {
    if (this.usuario?.Sucursal) {
      return this.usuario.Usuario;
    } else {
      return JSON.parse(localStorage.getItem('userData')!).Usuario
    }
  };

  getSucursal = (): string => {
    if (this.usuario?.Sucursal) {
      return this.usuario.Sucursal;
    } else {
      return JSON.parse(localStorage.getItem('userData')!).Sucursal
      
    }
  };
}
