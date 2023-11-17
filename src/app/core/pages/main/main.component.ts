import { Component, OnInit, inject } from '@angular/core';
import { AuthService, CargaEnvaseService, ToastService } from 'src/app/shared';
import 'web-bluetooth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private cargaEnvaseService = inject(CargaEnvaseService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  public showModal: string = 'none';

  public cargaExist: boolean = false;
  public tipoEnvase: any;
  public envases: any;

  private nombreEnvase: any;

  public carga = JSON.parse(localStorage.getItem('carga')!);

  private printCharacteristic: any;
  private cargaToPrint: any;

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

  generateMessageToPrint = () => {
    this.cargaToPrint = `SUPER MAMI ${this.authService.getSucursal()}\n`;
    this.cargaToPrint = `VALE PARA ENVASE\n`;
    this.cargaToPrint = `VALIDO POR EL DÍA DE EMISION\n\n`;
    this.cargaToPrint += `Fecha: 17/11/2023\nGuardia: ${this.authService.getUsuarioLogged()}\n \n`;
    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      envases.forEach((envase) => {
        console.log(envase);
        this.cargaToPrint += `${
          envase.cardEnvase.nombre ? envase.cardEnvase.nombre.toUpperCase() : ''
        } ${envase.cardEnvase.tipo.toUpperCase()} x${
          envase.cardEnvase.cantidad
        }u\n`;
      });

      this.cargaToPrint += `\n\n\n`;
      
      this.cargaToPrint += `N° PV: \n`;
      this.cargaToPrint += `N° Ticket: \n`;
    });
    // this.printImage();
    this.sendTextData(this.cargaToPrint);
  };

  print = () => {
    if (this.printCharacteristic == null) {
      navigator.bluetooth
        .requestDevice({
          filters: [
            {
              services: ['000018f0-0000-1000-8000-00805f9b34fb'],
            },
          ],
        })
        .then((device) => {
          console.log('Found ' + device.name);
          console.log('Connecting to GATT Server...');
          return device?.gatt?.connect();
        })
        .then((server) =>
          server?.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb')
        )
        .then((service) =>
          service?.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb')
        )
        .then((characteristic) => {
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

  // printImage() {
  //   this.http.get('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrau1JYGjkbcnZKJ9KmvBYtdrDlx6etC0yQ&usqp=CAU', { responseType: 'blob' })
  //     .subscribe((blob: Blob) => {
  //       this.printBlob(blob);
  //     });
  // }

  // printBlob(blob: Blob) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const imageContent = reader.result as string;
  //     this.sendTextData(imageContent);
  //   };
  //   reader.readAsDataURL(blob);
  // }

  sendTextData = (value: any) => {
    const encoder = new TextEncoder();
    const cargaToPrint = value + '\u000A\u000D';
    const chunkSize = 512;
    const chunks = [];

    // Divide la cargaToPrint en trozos más pequeños
    for (let i = 0; i < cargaToPrint.length; i += chunkSize) {
      chunks.push(cargaToPrint.slice(i, i + chunkSize));
    }

    // Envía cada trozo por separado
    chunks
      .reduce((prevPromise, chunk) => {
        return prevPromise.then(() => {
          return this.printCharacteristic.writeValue(encoder.encode(chunk));
        });
      }, Promise.resolve())
      .then(() => {
        this.toastService.setToastState(true, 'Vale impreso');
      })
      .catch((error) => {
        console.error('Error al enviar por trozos:', error);
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
