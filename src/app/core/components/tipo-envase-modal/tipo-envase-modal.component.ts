import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipo-envase-modal',
  templateUrl: './tipo-envase-modal.component.html',
  styleUrls: ['./tipo-envase-modal.component.sass']
})
export class TipoEnvaseModalComponent {
  private location = inject(Location)
  forwardProcess = (): void => {
    this.location.back()
  }
}
