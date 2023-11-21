import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService, CargaEnvaseService, ToastService } from 'src/app/shared';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private cargaEnvaseService = inject(CargaEnvaseService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  private http = inject(HttpClient);

  public showModal: string = 'none';

  public cargaExist: boolean = false;
  public tipoEnvase: any;
  public envases: any;

  private nombreEnvase: any;

  public carga = JSON.parse(localStorage.getItem('carga')!);

  private printCharacteristic: any;
  private cargaToPrint: any;

  private bluetooth = (navigator as any).bluetooth;

  constructor() {
    this.envases = this.cargaEnvaseService.getTipoEnvases();
  }

  ngOnInit(): void {
    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      if (envases.length > 0) {
        this.cargaExist = true;
      } else {
        this.cargaExist = false;
      }
    });
  }

  print = (): void => {
    this.printCharacteristic = null;

    if (this.printCharacteristic == null) {
      this.bluetooth
        .requestDevice({
          filters: [
            {
              services: ['000018f0-0000-1000-8000-00805f9b34fb'],
            },
          ],
        })
        .then((device: any) => {
          console.log('Found ' + device.name);
          console.log('Connecting to GATT Server...');
          return device?.gatt?.connect();
        })
        .then((server: any) =>
          server?.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb')
        )
        .then((service: any) =>
          service?.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb')
        )
        .then((characteristic: any) => {
          // Cache the characteristic
          this.printCharacteristic = characteristic;
          this.generateMessageToPrint();
        })
        .catch(() =>
          this.toastService.setToastState(true, 'Error Imprimiendo')
        );
    } else {
      this.generateMessageToPrint();
    }
  };

  generateMessageToPrint = (): void => {
    const date = DateTime.now();

    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      this.cargaToPrint = `$small$SUPER MAMI$small$` + '\n';
      // this.cargaToPrint = `\nSUPER MAMI\n`;
      // this.cargaToPrint += `VALE PARA ENVASE\n\n`;

      this.cargaToPrint += `NRO VALE: ${Math.floor(
        10000000 + Math.random() * 90000000
      )}\n`;
      this.cargaToPrint += `Sucursal: ${this.authService.getSucursal()}\n`;

      this.cargaToPrint += `FECHA: ${date.toLocaleString(
        DateTime.DATETIME_SHORT
      )}\nGUARDIA: ${this.authService.getUsuarioLogged()}\n\n`;

      envases.forEach((envase) => {
        this.cargaToPrint += `${
          envase.cardEnvase.nombre ? envase.cardEnvase.nombre.toUpperCase() : ''
        }  `;

        this.cargaToPrint += `${
          envase.cardEnvase.tipo.toUpperCase() != envase.cardEnvase.nombre.toUpperCase()
            ? envase.cardEnvase.tipo.toUpperCase()
            : ''
        }  `;
        this.cargaToPrint += `x${envase.cardEnvase.cantidad}u\n`;
      });

      this.cargaToPrint += `\n`;

      this.cargaToPrint += `NRO PV: \n`;
      this.cargaToPrint += `NRO TICKET: \n`;

      this.sendTextData();
    });
  };

  sendTextData = async () => {
    // const encoder = new TextEncoder();
    // await this.printCharacteristic.writeValue(encoder.encode(base64Image))

    const encoder2 = new TextEncoder();
    const cargaToPrint = this.cargaToPrint + '\u000A\u000D';
    const chunkSize = 512;

    for (let i = 0; i < cargaToPrint.length; i += chunkSize) {
      const chunk = cargaToPrint.slice(i, i + chunkSize);
      await this.printCharacteristic.writeValue(encoder2.encode(chunk));
    }
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
