import { Component, Input, OnInit, inject } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import { EnvasesDataService } from 'src/app/shared';
import { DateTime, DateTimeFormatOptions } from 'luxon';
@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.sass'],
})
export class TicketLayoutComponent implements OnInit {
  private envasesDataService = inject(EnvasesDataService);

  private envases: any = [];

  @Input() date!: string;

  ngOnInit(): void {
    this.envasesDataService.getEnvasesObservable().subscribe({
      next: (envases) => {
        this.envases = envases;
      },
      error: (err) => {
        this.envases = [];
      },
    });
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
