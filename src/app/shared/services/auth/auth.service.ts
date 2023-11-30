import { Injectable } from '@angular/core';
import { IUsuario, IUsuarioResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios: IUsuario[] = [
    { usuario: 'AV', password: '1234' },
    { usuario: 'R20', password: '1234' },
    { usuario: 'SV', password: '1234' },
    { usuario: 'CVL', password: '1234' },
    { usuario: 'SAL', password: '1234' },
    { usuario: '60C', password: '1234' },
    { usuario: 'AG', password: '1234' },
    { usuario: 'TLH', password: '1234' },
    { usuario: 'TSM', password: '1234' },
    { usuario: 'COC', password: '1234' },
    { usuario: 'csosa', password: '1234' },
    { usuario: 'momolina', password: '1234' },
    { usuario: 'mcastillo', password: '1234' },
    { usuario: 'lmartini', password: '1234' },
    { usuario: 'rbuttiero', password: '1234' },
    { usuario: 'murriche', password: '1234' },
    { usuario: 'jrojas', password: '1234' },
    { usuario: 'potro', password: '1234' },
    { usuario: 'ehuanco', password: 'huanco28' },
    { usuario: 'ebarrera', password: '1234' },
    { usuario: 'mchavez', password: '1234' },
    { usuario: 'pmarino', password: '1234' },
    { usuario: 'gtevez', password: '1234' },
  ];

  // Validar formulario auth
  userValidation = (usuario: IUsuario): IUsuarioResponse => {
    if (this.usuarios.includes(usuario)) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      return { status: 200, data: usuario };
    } else {
      return { status: 401, data: null };
    }
  };

  clearUser = () => localStorage.removeItem('usuario');

  getDataUser = (): IUsuario => JSON.parse(localStorage.getItem('usuario')!);
}
