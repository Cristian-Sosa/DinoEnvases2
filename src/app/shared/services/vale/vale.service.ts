import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastService } from '../toast';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth';
import { IShortUser, IVale } from '../../models';
import { EnvasesDataService } from '../envase';

@Injectable({
  providedIn: 'root',
})
export class ValeService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);
  private envasesService = inject(EnvasesDataService);
  private toastService = inject(ToastService);

  private vale: IVale = {
    NombreSucursal: 'av',
    nroVale: '',
    items: [],
  };

  private ean: BehaviorSubject<string> = new BehaviorSubject('');

  sendVale = (nroVale: string): Observable<any> => {
    this.vale.nroVale = nroVale;

    this.cargarVale();

    return this.http.post<any>(environment.apiUrl.concat('/vale/AddVale'), {
      carga: this.vale,
    });
  };

  cargarVale = (): void => {
    this.obtenerUsuario();
    this.obtenerItemsVale();
  };

  obtenerUsuario = (): void => {
    const usuario: IShortUser | null = this.authService.getDataUser();

    if (!usuario) {
      this.toastService.setToastState('Se requiere volver a ingresar');
    } else {
      this.vale.NombreSucursal = usuario.Usuario;
    }
  };

  obtenerItemsVale = (): void => {
    const envases = this.envasesService.getEnvases();

    if (!envases) {
      this.toastService.setToastState('No se pudo subir la carga');
    } else {
      this.vale.items = envases;
    }
  };

  setEan = (newEan: string): void => {
    this.ean.next(newEan);
  };

  getEAN = (): Observable<string> => {
    return this.ean.asObservable();
  };
}
