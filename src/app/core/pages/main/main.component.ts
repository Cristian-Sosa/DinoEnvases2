import { Component, OnInit, inject } from '@angular/core';
import { CargaEnvaseService, ToastService } from 'src/app/shared';
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

  private device!: BluetoothDevice;

  private popupWin: Window | null = null;

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

  generateDynamicHTML = async () => {
    await navigator.bluetooth
      .requestDevice({ acceptAllDevices: true })
      .then((device) => {
        this.toastService.setToastState(
          true,
          BluetoothUUID.getService(this.device.name!)
        );

        this.device = device;
      })
      .catch((error) => {
        this.toastService.setToastState(true, error);
      });

    this.print();
  };

  print = () => {
    let printable = document.getElementById('CargaEnvasesImprimir')?.innerHTML;

    this.popupWin = window.open('', '_blank');
    this.popupWin!.document.write(
      '<html><head><title>Imprimir</title></head><body styles="width=600px;height=auto">'
    );
    this.popupWin!.document.write(printable!);
    this.popupWin!.document.write('</body></html>');

    this.popupWin!.onload! = () => {
      this.popupWin?.print();
      this.popupWin?.close();
    };
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
