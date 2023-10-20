import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipo-envase-modal',
  templateUrl: './tipo-envase-modal.component.html',
  styleUrls: ['./tipo-envase-modal.component.sass'],
})
export class TipoEnvaseModalComponent {
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  returnProcess = (): void => this.location.back();

  forwardProcess = (): Promise<boolean> =>
    this.router.navigate(['..', 'tipo-cajon'], { relativeTo: this.route });
}
