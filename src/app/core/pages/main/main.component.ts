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

  getPrinter = (): void => {
    this.printCharacteristic = null;
    this.cargaToPrint = '';

    this.bluetooth
      .requestDevice({
        filters: [
          {
            services: ['000018f0-0000-1000-8000-00805f9b34fb'],
          },
        ],
      })
      .then((device: any) => {
        console.log('Conectando a ' + device.name);
        return device?.gatt?.connect();
      })
      .then((server: any) =>
        server?.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb')
      )
      .then((service: any) =>
        service?.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb')
      )
      .then((characteristic: any) => {
        this.printCharacteristic = characteristic;
        this.printCarga();
      })
      .catch(() => this.toastService.setToastState(true, 'Error Imprimiendo'));
  };

  createValeId = (): void => {
    let randomNumber = Math.floor(Math.random() * 999999) + 1;
    let formattedNumber: string = randomNumber.toString().padStart(6, '0');

    let formattedDate: string = DateTime.now().toISODate({ format: 'basic' })!;

    this.cargaToPrint += `$small$NRO VALE: ${formattedNumber.concat(
      '-',
      formattedDate
    )}$intro$`;
  };

  addHeaderToPrint = async () => {
    let date = DateTime.now();

    this.cargaToPrint = `$bighw$SPER MAMI$intro$`;
    this.cargaToPrint += `$big$VALE PARA ENVASE$intro$`;

    this.createValeId();

    this.cargaToPrint += `$small$Sucursal: ${this.authService.getSucursal()}$intro$`;

    this.cargaToPrint += `$small$FECHA: ${date.toLocaleString(
      DateTime.DATETIME_SHORT
    )}$intro$`;

    this.cargaToPrint += `$small$GUARDIA: ${
      this.authService.getUsuarioLogged()
        ? this.authService.getUsuarioLogged()
        : this.authService.getSucursal()
    }$intro$$intro$`;
  };

  addCargaToPrint = async () => {
    this.cargaToPrint += `$small$------------- DETALLE DEL VALE -----------$intro$`;
    this.cargaToPrint += `$small$COD.     DESC.                      CANT.$intro$`;

    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      envases.forEach((envase) => {
        this.cargaToPrint += `$small$${Math.floor(
          1000000 + Math.random() * 9000000
        )}  `;

        let nombreLength: number = 0;
        if (
          envase.cardEnvase.nombre &&
          envase.cardEnvase != envase.cardEnvase.tipo
        ) {
          nombreLength = envase.cardEnvase.nombre.concat(
            envase.cardEnvase.tipo
          ).length;
          this.cargaToPrint += envase.cardEnvase.nombre
            .toUpperCase()
            .concat(' ', envase.cardEnvase.tipo.toUpperCase());
        } else {
          nombreLength = envase.cardEnvase.nombre.length;
          this.cargaToPrint += envase.cardEnvase.nombre.toUpperCase();
        }

        for (let i = 0; i < 26 - nombreLength; i++) {
          this.cargaToPrint += ' ';
        }

        this.cargaToPrint += `${envase.cardEnvase.cantidad}$intro$`;
      });
    });
  };

  addFooterToprint = async () => {
    this.cargaToPrint += `$intro$`;
    this.cargaToPrint += `$small$------------------------------------------$intro$`;
    this.cargaToPrint += `$small$------- VALIDO POR EL DIA DE EMISION -----$intro$`;
    this.cargaToPrint += `$small$------------------------------------------$intro$$intro$`;

    this.cargaToPrint += `$big$NRO PV: $intro$`;
    this.cargaToPrint += `$big$NRO TICKET: $intro$`;
    this.cargaToPrint += `$intro$$intro$$cutt$`;
  };

  printCarga = async (): Promise<any> => {
    await this.addHeaderToPrint();
    await this.addCargaToPrint();
    await this.addFooterToprint();
    this.sendTextData();
  };

  sendTextData = async () => {
    const printWindow = window.open('', '_blank');

    printWindow!.document.write(`<html>
    <head>
      <title>Vale de envases - preview</title>
      <style type="text/css">
      * {
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          font-size: 8px;
          font-weight: 400;
        }
        
        body {
          width: 100%;
          height: auto;
        }
        
        .title, .sub-title {
          color: #000;
        }
        
        h3, p, span { 
          color: #222;
        }
        
        .ticket_header {  
          padding: 24px 0 8px;
          
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        .ticket_header .logo {
          margin-bottom: 16px;
        }
        
        /* .ticket_header .title {
          margin-bottom: 2px;
        } */
        /* .ticket_header .sub-title {
          font-size: 12px;
        } */
        
        .cabecera {
          padding-top: 16px;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 8px;
        }
        
        .cuerpo {
          padding: 24px 0;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }
        
        .cuerpo .separador {
          color: #000;
        }
        
        .card {
          padding: 8px 0;
        
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
        }
        .card .card_header {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          gap: 8px;
        }
        
        .card .card_header .envase {
          color: #000;
        }
        
        .card .card_header .unidades {
          color: #000;
        }
        
        .footer {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        
        .firma-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 24px;
        }
        
        .footer-firma {
          width: 160px;
        
          margin-top: 64px;
          padding: 8px 0;
        
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        
          border-top: 1px solid #000;
        }
        
        .footer-firma.caja {
          width: max-content;
        }
        
        .footer-firma p {
          color: #000;
          text-align: center;
        }
      </style>
    </head>
    <body>`);
    printWindow!.document.write(
      document.querySelector('#ticketPrintComponent')?.innerHTML!
    );

    printWindow!.document.write(`</body></html>`);

    printWindow!.document.close();
    printWindow!.print();
  };
  // sendTextData = async () => {
  //   // const encoder = new TextEncoder();
  //   // const cargaToPrint = this.cargaToPrint + '\u000A\u000D';
  //   // const chunkSize = 512;

  //   // Dividir texto en fragmentos para imprimir buffer de 250b
  //   // for (let i = 0; i < cargaToPrint.length; i += chunkSize) {
  //   //   const chunk = cargaToPrint.slice(i, i + chunkSize);
  //   //   await this.printCharacteristic.writeValue(encoder.encode(chunk));
  //   // }

  //   const a = document.createElement('a');

  //   a.href = 'com.fidelier.printfromweb://'.concat(this.cargaToPrint);
  //   a.click();
  // };

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
