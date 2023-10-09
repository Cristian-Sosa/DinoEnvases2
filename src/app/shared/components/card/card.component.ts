import { Component, Input, inject } from '@angular/core';
import { EnvaseService } from '../../services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  private envaseService = inject(EnvaseService);

  @Input() card!: any;

  removeEnvase = (): void => {
    this.envaseService.removeEnvase(this.card)
  }
}
