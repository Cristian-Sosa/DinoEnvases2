import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../pages';
import { MainRoutingModule } from './main-routing.module';
import { ButtonsModule, CardComponent } from 'src/app/shared';
import { ListaEnvasesComponent } from '../../components/lista-envases/lista-envases.component';

@NgModule({
  declarations: [MainComponent, CardComponent, ListaEnvasesComponent],
  imports: [CommonModule, MainRoutingModule, ButtonsModule],
  exports: [MainComponent],
})
export class MainModule {}
