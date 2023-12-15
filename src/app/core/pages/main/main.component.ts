import { Component, OnInit, inject } from '@angular/core';
import { AuthService, EnvasesDataService, ValeService } from 'src/app/shared';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  private envasesDataService = inject(EnvasesDataService);
  private authService = inject(AuthService);
  private valeService = inject(ValeService);

  public showModal: string = 'none';
  public generateTicket: boolean = false;

  public cargaExist: boolean = false;
  public datos: {
    fecha: string;
    usuario: string | undefined;
    ticket: string;
  };

  constructor() {
    this.datos = {
      fecha: DateTime.now().toFormat('LLL dd/MM/yyyy, hh:mm:ss'),
      usuario: this.authService.getDataUser()?.Nombre,
      ticket: this.generarCodigoAleatorio(),
    };
  }
  public envaseDTO: {
    envaseId: number | null;
    tipoEnvaseId: number | null;
    cantidad: number | null;
  } = {
    envaseId: null,
    tipoEnvaseId: null,
    cantidad: null,
  };

  ngOnInit(): void {
    this.envasesDataService.getEnvasesObservable().subscribe({
      next: (res) => {
        res.length > 0 ? (this.cargaExist = true) : (this.cargaExist = false);
      },
      error: () => {
        this.cargaExist = false;
      },
    });

    if (localStorage.getItem('carga_pendiente')) {
      this.notificacionPush(
        'Hay cargas pendientes de subir, conectate a internet para subirlas'
      );
    }
  }

  generarCodigoAleatorio = (): string => {
    const codigo = Math.floor(100 + Math.random() * 900);
    return codigo.toString().concat(DateTime.now().toFormat('ssSSS'));
  };

  printCarga = () => {
    this.datos = {
      fecha: DateTime.now().toFormat('LLL dd/MM/yyyy, hh:mm').toUpperCase(),
      usuario: this.authService.getDataUser()?.Nombre,
      ticket: this.generarCodigoAleatorio(),
    };

    this.valeService.sendVale(this.datos.ticket).subscribe({
      next: (res) => {
        console.log(res);
        this.valeService.setEan(res.barcode.CodBarra1);
      },
      error: (err) => {
        console.log(err);
      },
    });

    const printWindow = window.open('', '_blank');

    printWindow!.document.write(`<html>
    <head>
      <title>Vale de envases - preview</title>
      <style type="text/css">
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          color: #000;
        }
        
        body {
          width: 100%;
          height: auto;
        }
        
        .ticket_header {  
          padding: 24px 0 8px;
          
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .ticket_header .logo {
          width: 100%;
          margin-bottom: 8px;
          object-fit: container;
        }

        .ticket_header .title {
          margin-bottom: 2px;
          font-size: 18px;
        }
        
        .ticket_header .sub-title {
          font-size: 14px;
          font-weight: 500;
        }
        
        .cabecera {
          padding-top: 16px;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          gap: 2px;

          font-size: 12px;
          font-weight: 500;
        }
        
        .cuerpo {
          padding: 16px 0;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;

          font-size: 14px;
          font-weight: 500;
        }
        
        .cuerpo .separador {
          margin-bottom: 8px;
          font-size: 12px;
        }
        
        .card {        
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: strech;
        }

        .card_header {     
          width: 100%;

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        
        .firma-container {
          width: 100%;
          margin-top: 8px;

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-firma {
          width: 80%;
        
          margin: 32px auto 0;
        
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        
          border-top: 1px solid #000;
        }
        
        .footer-firma.caja {
          width: 40%;
        }
        
        .footer-firma p {
          margin-top: 4px;
          text-align: center;
          font-size: 12px;
        }

        main svg {
          margin: 8px auto 16px;
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

  notificacionPush = (message: string): void => {
    navigator.serviceWorker
      .getRegistration()
      .then((reg) => reg?.showNotification(message));
  };

  newEnvase = (): string => (this.showModal = 'tipoEnvase');

  tipoEnvaseSelected = (tipoEnvaseId: number): void => {
    if (tipoEnvaseId !== 0) {
      this.envaseDTO.tipoEnvaseId = tipoEnvaseId!;
      this.showModal = 'cantidadEnvase';
    } else {
      this.showModal = 'none';
    }
  };

  cantidadEnvaseSelected = (
    obj:
      | {
          envaseId: number;
          cantidad: number;
        }
      | 0
  ): void => {
    if (obj) {
      this.envaseDTO.envaseId = obj.envaseId!;
      this.envaseDTO.cantidad = obj.cantidad!;
      this.envasesDataService.cargarEnvase(this.envaseDTO);
      this.showModal = 'none';
    } else {
      this.showModal = 'tipoEnvase';
    }
  };
}
