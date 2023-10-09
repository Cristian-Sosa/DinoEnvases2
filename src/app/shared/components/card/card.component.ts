import { Component, Input, inject } from '@angular/core';
import { EnvaseService } from '../../services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  private envaseService = inject(EnvaseService);

  public remove: boolean = false;

  @Input() card!: any;

  removeEnvase = (): void => {
    this.remove = true;
    let interval = setInterval(() => {
      this.envaseService.removeEnvase(this.card);
      clearInterval(interval);
    }, 250);
  };
}
