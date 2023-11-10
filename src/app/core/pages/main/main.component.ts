import { Component, OnInit, inject } from '@angular/core';
import { CargaEnvaseService, ToastService } from 'src/app/shared';

import ConectorPluginV3 from './ConectorPluginV3';
import 'web-bluetooth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private cargaEnvaseService = inject(CargaEnvaseService);
  private toastService = inject(ToastService);

  public showModal: string = 'none';

  public cargaExist: boolean = false;
  public tipoEnvase: any;
  private nombreEnvase!: string;
  public envases: any;

  public carga = JSON.parse(localStorage.getItem('carga')!);

  private exampleDevice!: BluetoothDevice;

  constructor() {
    this.envases = this.cargaEnvaseService.getTipoEnvases();
  }

  ngOnInit(): void {
    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      if (envases.length > 0) {
        this.cargaExist = true;
        this.notificacionPush();
      } else {
        this.cargaExist = false;
      }
    });
  }

  generateDynamicHTML = () => {
    navigator.bluetooth
      .requestDevice({ filters: [{ services: ['printer'] }] })
      .then((device) => {
        this.toastService.setToastState(true, device.id);

        // let deviceUUID = device.id

        let printable = document.getElementById(
          'CargaEnvasesImprimir'
        )?.innerHTML;

        const popupWin = window.open('', '_blank', 'width=600,height=auto');
        popupWin!.document.write('<html><head><title>Imprimir</title></head><body>');
        popupWin!.document.write(printable!);
        popupWin!.document.write('</body></html>');
        popupWin!.document.close();

        popupWin!.onload = () => {
          popupWin!.print();
          popupWin!.close()
        }
      })
      .catch((error) => {
        this.toastService.setToastState(true, error);
      });
  };

  notificacionPush = (): void => {
    navigator.serviceWorker
      .getRegistration()
      .then((reg) =>
        reg?.showNotification(`Se recuperó una carga pendiente de imprimir`)
      );
  };

  newEnvase = (): string => (this.showModal = 'tipoEnvase');

  tipoEnvaseSelected = (envase: string | null): void => {
    this.tipoEnvase = {};
    switch (envase) {
      case 'cerveza':
        this.tipoEnvase = this.envases.cerveza;
        this.showModal = 'cantidadEnvase';
        this.nombreEnvase = envase!;
        break;

      case 'gaseosa':
        this.tipoEnvase = this.envases.gaseosa;
        this.showModal = 'cantidadEnvase';
        this.nombreEnvase = envase!;
        break;

      case 'drago':
        this.tipoEnvase = this.envases.drago;
        this.showModal = 'cantidadEnvase';
        this.nombreEnvase = envase!;
        break;

      case 'cajon':
        this.tipoEnvase = this.envases.cajones;
        this.showModal = 'cantidadEnvase';
        this.nombreEnvase = envase!;
        break;

      default:
        this.showModal = 'none';
        break;
    }
  };

  cantidadEnvaseSelected = (
    obj: { tipo: any; cantidad: string | number } | null
  ): void => {
    if (obj) {
      let envaseDTO: any = {
        nombre: this.nombreEnvase,
        tipo: obj?.tipo,
        cantidad: obj.cantidad,
      };
      this.cargaEnvaseService.setEnvase(envaseDTO);
      this.showModal = 'none';
    } else {
      this.showModal = 'tipoEnvase';
    }
  };
}
