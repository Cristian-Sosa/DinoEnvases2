import { Component, OnInit, inject } from '@angular/core';
import { CargaEnvaseService } from 'src/app/shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private cargaEnvaseService = inject(CargaEnvaseService);

  public showModal: string = 'none';

  public cargaExist: boolean = false;
  public tipoEnvase: any;
  private nombreEnvase!: string;
  public envases: any;

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

  print = (): void => {
    // const printContents = document.getElementById('CargaEnvases')?.innerHTML;
    let carga = JSON.parse(localStorage.getItem('carga')!)
    const popupWin = window.open('', '_blank');
    popupWin!.document.open();
    popupWin!.document.write(`
    <html>
    <head>
      <title>Vale de envases</title>
      <style type="text/css" media="all">
      @media print {
      .tg {
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0px auto;
        text-align: center;
      }
      .tg td {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
      }
      .tg th {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
      }
      .tg .tg-0lax {
        text-align: center;
        vertical-align: top;
      }

      .tg .tg-0lax:nth-child(2) {
        text-align: left;
      }

      .tg .tg-0lax:nth-child(3) {
        text-align: left;
      }
      thead tr th.tg-0lax {
        text-align: center;
      }
  }
  </style>
    </head>
    <body onload="window.print();window.close()">

    <div class="tg-wrap">
    <table class="tg">
      <thead>
        <tr>
          <th class="tg-0lax">Cant.</th>
          <th class="tg-0lax">Descripción</th>
          <th class="tg-0lax">Tipo / Color</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        ${carga.map((item: any) => {
          return `
            <tr>
              <td class="tg-0lax">${item.cardEnvase.cantidad}</td>
              <td class="tg-0lax">${item.cardEnvase.nombre}</td>
              <td class="tg-0lax">${item.cardEnvase.tipo}</td>
            </tr>
          `;
        }).join('')}
        </tr>
      </tbody>
    </table>
  </div>
    
    </body>
    </html>
  `);
    popupWin!.document.close();
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
