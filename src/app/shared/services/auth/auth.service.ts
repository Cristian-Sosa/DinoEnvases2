import { Injectable, inject } from '@angular/core';
import {
  IActiveUsersResponse,
  IFullUser,
  IShortUser,
  IUserToVerify,
  IValidateUserResponse,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { ToastService } from '../toast';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  private userData: IShortUser | null = null;

  private usuarios: IFullUser[] = [
    {
      Id: 1,
      DNI: '22595900',
      Nombre: 'Claudia',
      Apellido: 'Mamonde',
      Usuario: 'cmamonde',
      Password: '22595900',
      Habilitado: true,
    },
    {
      Id: 2,
      DNI: '24801637',
      Nombre: 'Mirian',
      Apellido: 'Laime',
      Usuario: 'mlaime',
      Password: '24801637',
      Habilitado: true,
    },
    {
      Id: 3,
      DNI: '27549517',
      Nombre: 'Daniela',
      Apellido: 'Sartorelli',
      Usuario: 'dsartorelli',
      Password: '27549517',
      Habilitado: true,
    },
    {
      Id: 4,
      DNI: '28369410',
      Nombre: 'Eduardo',
      Apellido: 'Huanco',
      Usuario: 'ehuanco',
      Password: 'huanco28',
      Habilitado: true,
    },
    {
      Id: 5,
      DNI: '32960011',
      Nombre: 'Supermercado AV',
      Apellido: 'Supermercado AV',
      Usuario: 'AV',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 6,
      DNI: '32960028',
      Nombre: 'Supermercado R20',
      Apellido: 'Supermercado R20',
      Usuario: 'R20',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 7,
      DNI: '32960035',
      Nombre: 'Supermercado SV',
      Apellido: 'Supermercado SV',
      Usuario: 'SV',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 8,
      DNI: '32960042',
      Nombre: 'Supermercado CVL',
      Apellido: 'Supermercado CVL',
      Usuario: 'CVL',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 9,
      DNI: '32960059',
      Nombre: 'Supermercado SAL',
      Apellido: 'Supermercado SAL',
      Usuario: 'SAL',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 10,
      DNI: '32960066',
      Nombre: 'Supermercado 60C',
      Apellido: 'Supermercado 60C',
      Usuario: '60C',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 11,
      DNI: '32960240',
      Nombre: 'Supermercado AG',
      Apellido: 'Supermercado AG',
      Usuario: 'AG',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 12,
      DNI: '32960295',
      Nombre: 'Supermercado TLH',
      Apellido: 'Supermercado TLH',
      Usuario: 'TLH',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 13,
      DNI: '32960301',
      Nombre: 'Supermercado TSM',
      Apellido: 'Supermercado TSM',
      Usuario: 'TSM',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 14,
      DNI: '32960332',
      Nombre: 'Supermercado COC',
      Apellido: 'Supermercado COC',
      Usuario: 'COC',
      Password: '1234',
      Habilitado: true,
    },
  ];

  getAllActiveUsers = (): Observable<IActiveUsersResponse> => {
    return this.http.get<IActiveUsersResponse>(
      environment.apiUrl.concat('/AllActiveUsers')
    );
  };

  validateUser = (
    usuario: IUserToVerify
  ): Observable<IValidateUserResponse> => {
    return this.http.post<IValidateUserResponse>(
      environment.apiUrl.concat('/ValidateUser'),
      usuario
    );
  };

  updateActiveUsers = (): void => {
    this.getAllActiveUsers()
      .pipe(take(1))
      .subscribe({
        next: (res) => (this.usuarios = res.data),
        error: (err) =>
          this.toastService.setToastState('no se actualizaron los usuarios'),
      });
  };

  userValidation = (usuario: IUserToVerify): any => {
    const userToSearch: IFullUser | IShortUser | undefined = this.usuarios.find(
      (u) =>
        u.Usuario.toUpperCase() === usuario.Usuario.toUpperCase() &&
        u.Password.toUpperCase() === usuario.Password.toUpperCase()
    );
    if (userToSearch) {
      let usuarioDTO = {
        Id: userToSearch.Id,
        Nombre: userToSearch.Nombre,
        Apellido: userToSearch.Apellido,
        Usuario: userToSearch.Usuario,
        Habilitado: userToSearch.Habilitado,
      };
      this.setUsuario(usuarioDTO);
      return true;
    } else {
      return false;
    }
  };

  setUsuario = (usuario: IShortUser): void => {
    this.userData = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  clearUser = (): void => localStorage.removeItem('usuario');

  getDataUser = (): IShortUser | null => {
    if (this.userData) {
      return this.userData;
    } else if (localStorage.getItem('usuario')) {
      this.userData = JSON.parse(localStorage.getItem('usuario')!);
      return this.userData;
    } else {
      return null;
    }
  };
}
