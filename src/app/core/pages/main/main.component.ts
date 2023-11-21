import { HttpClient } from '@angular/common/http';
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
    // const base64Image = `data:image/png;base64,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`;

    this.cargaEnvaseService.observableEnvases().subscribe((envases) => {
      // this.cargaToPrint = `\n${base64Image.toString()}\n\n`;
      this.cargaToPrint = `\n\nSUPER MAMI ${this.authService.getSucursal()}\n`;
      this.cargaToPrint += `VALE PARA ENVASE\n`;
      this.cargaToPrint += `VALIDO POR EL DIA DE EMISION\n\n`;
      this.cargaToPrint += `Fecha: 17/11/2023\nGuardia: ${this.authService.getUsuarioLogged()}\n \n`;

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
    const base64Image = `data:image/octet-stream;base64,UklGRr4FAABXRUJQVlA4WAoAAAAgAAAAiAEAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg0AMAALAyAJ0BKokBgAA//f7/f7+8v7Is9Suz8D+JZ27dCmdaQXaiWg6z/HU3WBl/5Q6FD7RRFhO9Mh3wqc3d2j7RRFhO+vztTEv2+Zp6elBpGKdl9w18kYxFynbme2LgMkdjxPX/lH1jfWrVBoxn5X33acb9j3/WAFG5g9M5e97zewb82AaYdW+xIo6JeHOaqXQr4CSQprp2yAVNTKmrjyR+yeOJkqcPI3F72Y0LpFyK4tpPsCC3p297Eb9jFpTJYEiBAlJp68sNTdPO36aRgYnd3uXBsnJBVRVbmefURdhwbicWFwQHPSP1inILBfETViZktpOu6SNiAAvZUkziox+09mgUMdg/XZwLjuBRmbrQqWuUkBU3NyDi2x16BNM0EvmWkFvh/Nyvzv38JzBUyC4MGKTKaJkfV0sIP2w69bOdUnBZS5CbjbXwETUEOPUNToloKaFZn/06LoHfJlhqgaVqIutduF2gLBL99+bKn/nfgmsi9YKMiu2WgM0TamH9ve8D3yonxF72KM3U6OYfXnkAoc4fwpZ9OC4IjEEARxD90AD+5Woyvf31hVWUUgIjKFDVKyf1RYMFl5oQbA2hAqNWsgvbrWOiWALJKguTpHJqOGLPUzT+nbEdsOGIpLqg6auwI2DmZQGlIu+B7dEN0uhxV/G7Qq21q8iqRj7UeZ5jH+GWcAZBu/vcTzMp2aiqSwzdA9u8kImZMIVM9amBvTc04TBQ9INIGEyzcYMn6aAqHjve/OtVQVV5KzLHbB0Z1hlHcxS9dZtZwgI+fmQjj+tXQLiav5phpQTrUmbDDnR+As9T1DJhKPUuGYa626a00nHTuT0soR3T5GfUbPuJW630A/X4iLkHvdIGBx2NINv3p76e6T5mn5ymKaIZLy0uOp6Uq6il0pCgWEujMsM3dd3cxYTV3Xnm3ADnJ0tbgkNLFGRK6KHnoBxMpTQoJD+oZLs/YvCnzAv8PVuuA+AccX0mCILhINQ6AvzvUVpqpydL6dUW0S1J7xp2Jod1CC07l8IOPllReEgkmiY1vwzfrbYFzDbsBdJs6CDWDEAovwcv9+suXSRaDLxTR8zLrNjTvu9QCa/ICnBXv2nlPeRd4UMYHMUVbVYysmqxnkKicPp7lMqPMELmN2m8sTFetT6M8mgg42DRsnz4sp0T9zNfkEhsV3PrMa0pK+PQjYIC0n2C5Fp9eDGDrNKhU3T9Q+X3kfRKsST8m5uqSJeq4/MSNAmNYuUpr1Jh3WEEXfK0bDOTIoTXVA4ACM8Sutq8R7cbVkWunAAAAB7Dwa+ZKnQcISAAAAA=`;
    console.log('imprimiendo imagen: ', base64Image)
    
    const encoder = new TextEncoder();
    await this.printCharacteristic.writeValue(encoder.encode(base64Image))
    
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
