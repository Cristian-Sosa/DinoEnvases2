import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, InputRadioComponent, SelectComponent } from '../../components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, SelectComponent, InputRadioComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputComponent, SelectComponent, InputRadioComponent],
})
export class InputsModule {}
