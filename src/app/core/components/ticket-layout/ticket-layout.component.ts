import { Component, OnInit, inject } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import { CargaEnvaseService } from 'src/app/shared';

@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.sass'],
})
export class TicketLayoutComponent implements OnInit {
  private envaseService = inject(CargaEnvaseService)

  private envases: any = undefined;

  ngOnInit(): void {
    this.envaseService.observableEnvases().subscribe({
      next: (res) => {
        this.envases = res

        console.log(this.envases)
      }, error: (err) => {

      }
    })
    this.generateEAN13Barcode();
  }

  generateEAN13Barcode = () => {
    JsBarcode('#barcode', '3311000100001', {
      format: 'EAN13',
      lineColor: '#333',
      width: 1.5,
      height: 20,
      displayValue: true,
    });
  };
}