import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../pages';
import { MainRoutingModule } from './main-routing.module';
import {
  ButtonsModule,
  CardComponent,
  EnvaseService,
  InputsModule,
} from 'src/app/shared';
import { ListaEnvasesComponent } from '../../components/lista-envases/lista-envases.component';
import { TipoEnvaseModalComponent } from '../../components';

@NgModule({
  declarations: [
    MainComponent,
    CardComponent,
    ListaEnvasesComponent,
    TipoEnvaseModalComponent,
  ],
  imports: [CommonModule, MainRoutingModule, ButtonsModule, InputsModule],
  providers: [EnvaseService],
  exports: [MainComponent],
})
export class MainModule {}
