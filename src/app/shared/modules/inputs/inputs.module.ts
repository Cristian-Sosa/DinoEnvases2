import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, SelectComponent } from '../../components';

@NgModule({
  declarations: [InputComponent, SelectComponent],
  imports: [CommonModule],
  exports: [InputComponent, SelectComponent],
})
export class InputsModule {}
