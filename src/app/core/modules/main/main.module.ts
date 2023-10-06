import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../pages';
import { MainRoutingModule } from './main-routing.module';
import { ButtonsModule } from 'src/app/shared';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, ButtonsModule],
  exports: [MainComponent],
})
export class MainModule {}
