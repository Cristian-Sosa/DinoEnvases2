import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../pages';
import { MainRoutingModule } from './main-routing.module';
import {
  ButtonsModule,
  CardComponent,
  InputsModule,
} from 'src/app/shared';
import { ListaEnvasesComponent } from '../../components/lista-envases/lista-envases.component';
import {
  CantidadEnvaseModalComponent,
  TipoEnvaseModalComponent,
} from '../../components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    CardComponent,
    ListaEnvasesComponent,
    TipoEnvaseModalComponent,
    CantidadEnvaseModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    ButtonsModule,
    InputsModule,
  ],
  providers: [],
  exports: [MainComponent],
})
export class MainModule {}
