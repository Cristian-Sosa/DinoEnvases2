import { Component, OnInit } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.sass'],
})
export class TicketLayoutComponent implements OnInit {
  ngOnInit(): void {
    this.generateEAN13Barcode();
  }

  generateEAN13Barcode = () => {
    JsBarcode('#barcode', '7790070418203', {
      format: 'EAN13',
      lineColor: '#000',
      width: 2,
      height: 40,
      displayValue: true,
    });
  };
}
