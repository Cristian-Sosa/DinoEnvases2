import { Component, Input, inject } from '@angular/core';
import { CargaEnvaseService, EnvaseService } from '../../services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  private cargaEnvaseService = inject(CargaEnvaseService);

  public remove: boolean = false;

  @Input() card!: any;

  removeEnvase = (): void => {
    this.remove = true;
    let interval = setInterval(() => {
      this.cargaEnvaseService.removeEnvase(this.card);
      clearInterval(interval);
    }, 250);
  };
}
