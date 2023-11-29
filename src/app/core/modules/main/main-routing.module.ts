import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../../pages';
import { CantidadEnvaseModalComponent, TicketLayoutComponent, TipoEnvaseModalComponent } from '../../components';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'nuevo-envase',
        children: [
          { path: 'tipo-envase', component: TipoEnvaseModalComponent },
          { path: 'cantidad-envase', component: CantidadEnvaseModalComponent },
        ],
      },
      { path: 'ticket-envases', component: TicketLayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
