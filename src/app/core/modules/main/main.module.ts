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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    CardComponent,
    ListaEnvasesComponent,
    TipoEnvaseModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    ButtonsModule,
    InputsModule,
  ],
  providers: [EnvaseService],
  exports: [MainComponent],
})
export class MainModule {}
