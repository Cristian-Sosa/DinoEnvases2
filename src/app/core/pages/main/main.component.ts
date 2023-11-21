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
      this.cargaToPrint = `$bighw$SUPER MAMI$intro$`;
      this.cargaToPrint += `$big$VALE PARA ENVASE$intro$$intro$`;

      this.cargaToPrint += `$small$NRO VALE: ${Math.floor(
        10000000 + Math.random() * 90000000
      )}$intro$`;
      this.cargaToPrint += `$small$Sucursal: ${this.authService.getSucursal()}$intro$`;

      this.cargaToPrint += `$small$FECHA: ${date.toLocaleString(
        DateTime.DATETIME_SHORT
      )}$intro$small$GUARDIA: ${this.authService.getUsuarioLogged()}$intro$$intro$`;

      envases.forEach((envase) => {
        this.cargaToPrint += `$big$${
          envase.cardEnvase.nombre ? envase.cardEnvase.nombre.toUpperCase() : ''
        }  `;

        this.cargaToPrint += `${
          envase.cardEnvase.tipo.toUpperCase() != envase.cardEnvase.nombre.toUpperCase()
            ? envase.cardEnvase.tipo.toUpperCase()
            : ''
        }  `;
        this.cargaToPrint += `x${envase.cardEnvase.cantidad}u$intro$`;
      });

      this.cargaToPrint += `$intro$`;

      this.cargaToPrint += `$big$NRO PV: $intro$`;
      this.cargaToPrint += `$big$NRO TICKET: $intro$$intro$$intro$`;

      this.sendTextData();
    });
  };

  sendTextData = async () => {
    // const encoder2 = new TextEncoder();
    // const cargaToPrint = this.cargaToPrint + '\u000A\u000D';
    // const chunkSize = 512;

    // for (let i = 0; i < cargaToPrint.length; i += chunkSize) {
    //   const chunk = cargaToPrint.slice(i, i + chunkSize);
    //   await this.printCharacteristic.writeValue(encoder2.encode(chunk));
    // }

    const a = document.createElement('a');

    a.href = 'com.fidelier.printfromweb://'.concat(this.cargaToPrint);
    a.click()
    console.log('Petición hecha')
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
