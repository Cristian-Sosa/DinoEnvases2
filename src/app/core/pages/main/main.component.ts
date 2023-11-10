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

    // this.getImpresoras();
  }

  getImpresoras = () => {
    navigator.bluetooth
      .requestDevice({ filters: [{ services: ['battery_service'] }] })
      .then((device) => {
        // Lógica cuando la Promesa se resuelve
        this.toastService.setToastState(true, device.name)
      })
      .catch((error) => {
        // Lógica cuando la Promesa se rechaza
        this.toastService.setToastState(true, `Error con el ${error}`)
      });
      
    // this.toastService.setToastState(true, JSON.stringify(impresoras))
  };

  generateDynamicHTML = async () => {
    navigator.bluetooth
      .requestDevice()
      .then((device) => {
        this.toastService.setToastState(true, device.name);
      })
      .catch((error) => {
        console.error(error);
      });
    // const conector = new ConectorPluginV3();
    // conector
    //   .Iniciar()
    //   .EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
    //   .EscribirTexto('Vale de envases')
    //   .Feed(1)
    //   .Feed(2)
    //   .EscribirTexto('Cerveza | Verde | 5u')
    //   .Feed(1)
    //   .EscribirTexto('Cerveza | Marrón | 3u')
    //   .Feed(1)
    //   .EscribirTexto('Gaseosa | Coca Cola | 12u')
    //   .Feed(1)
    //   .EscribirTexto('Cajón | Coca Cola | 3u')
    //   .Iniciar()
    //   .Feed(1);
    // const respuesta = await conector.imprimirEn('SOL54_E437');
    // if (respuesta == true) {
    //   this.toastService.setToastState(true, ' Impreso correctamente');
    // } else {
    //   this.toastService.setToastState(true, respuesta);
    // }
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
