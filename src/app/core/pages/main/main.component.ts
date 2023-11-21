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

  print = async (): Promise<void> => {
    this.printCharacteristic = null;

    if (this.printCharacteristic == null) {
      await this.bluetooth
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

  generateMessageToPrint = async (): Promise<void> => {
    const base64Image = `data:image/octet-stream;base64,UklGRr4FAABXRUJQVlA4WAoAAAAgAAAAiAEAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg0AMAALAyAJ0BKokBgAA//f7/f7+8v7Is9Suz8D+JZ27dCmdaQXaiWg6z/HU3WBl/5Q6FD7RRFhO9Mh3wqc3d2j7RRFhO+vztTEv2+Zp6elBpGKdl9w18kYxFynbme2LgMkdjxPX/lH1jfWrVBoxn5X33acb9j3/WAFG5g9M5e97zewb82AaYdW+xIo6JeHOaqXQr4CSQprp2yAVNTKmrjyR+yeOJkqcPI3F72Y0LpFyK4tpPsCC3p297Eb9jFpTJYEiBAlJp68sNTdPO36aRgYnd3uXBsnJBVRVbmefURdhwbicWFwQHPSP1inILBfETViZktpOu6SNiAAvZUkziox+09mgUMdg/XZwLjuBRmbrQqWuUkBU3NyDi2x16BNM0EvmWkFvh/Nyvzv38JzBUyC4MGKTKaJkfV0sIP2w69bOdUnBZS5CbjbXwETUEOPUNToloKaFZn/06LoHfJlhqgaVqIutduF2gLBL99+bKn/nfgmsi9YKMiu2WgM0TamH9ve8D3yonxF72KM3U6OYfXnkAoc4fwpZ9OC4IjEEARxD90AD+5Woyvf31hVWUUgIjKFDVKyf1RYMFl5oQbA2hAqNWsgvbrWOiWALJKguTpHJqOGLPUzT+nbEdsOGIpLqg6auwI2DmZQGlIu+B7dEN0uhxV/G7Qq21q8iqRj7UeZ5jH+GWcAZBu/vcTzMp2aiqSwzdA9u8kImZMIVM9amBvTc04TBQ9INIGEyzcYMn6aAqHjve/OtVQVV5KzLHbB0Z1hlHcxS9dZtZwgI+fmQjj+tXQLiav5phpQTrUmbDDnR+As9T1DJhKPUuGYa626a00nHTuT0soR3T5GfUbPuJW630A/X4iLkHvdIGBx2NINv3p76e6T5mn5ymKaIZLy0uOp6Uq6il0pCgWEujMsM3dd3cxYTV3Xnm3ADnJ0tbgkNLFGRK6KHnoBxMpTQoJD+oZLs/YvCnzAv8PVuuA+AccX0mCILhINQ6AvzvUVpqpydL6dUW0S1J7xp2Jod1CC07l8IOPllReEgkmiY1vwzfrbYFzDbsBdJs6CDWDEAovwcv9+suXSRaDLxTR8zLrNjTvu9QCa/ICnBXv2nlPeRd4UMYHMUVbVYysmqxnkKicPp7lMqPMELmN2m8sTFetT6M8mgg42DRsnz4sp0T9zNfkEhsV3PrMa0pK+PQjYIC0n2C5Fp9eDGDrNKhU3T9Q+X3kfRKsST8m5uqSJeq4/MSNAmNYuUpr1Jh3WEEXfK0bDOTIoTXVA4ACM8Sutq8R7cbVkWunAAAAB7Dwa+ZKnQcISAAAAA=`;
    console.log('imprimiendo imagen: ', base64Image)

    const date = DateTime.now()

    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      this.cargaToPrint = `\n${base64Image.toString()}\n\n`;
      this.cargaToPrint = `\n\nSUPER MAMI ${this.authService.getSucursal()}\n`;
      this.cargaToPrint += `VALE PARA ENVASE\n`;
      this.cargaToPrint += `VALIDO POR EL DIA DE EMISION\n\n`;
      this.cargaToPrint += `Fecha: ${date.toLocaleString(DateTime.DATETIME_SHORT)}\nGuardia: ${this.authService.getUsuarioLogged()}\n \n`;

      envases.forEach((envase) => {
        this.cargaToPrint += `${
          envase.cardEnvase.nombre ? envase.cardEnvase.nombre.toUpperCase() : ''
        } ${
          envase.cardEnvase.tipo.toUpperCase() != envase.cardEnvase.nombre
            ? envase.cardEnvase.tipo.toUpperCase()
            : ''
        } x${envase.cardEnvase.cantidad}u\n`;
      });

      this.cargaToPrint += `\n`;

      this.cargaToPrint += `Nro PV: \n`;
      this.cargaToPrint += `Nro Ticket: \n\n`;
      this.sendTextData();
    });
  };

  sendTextData = async (): Promise<void> => {    
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
