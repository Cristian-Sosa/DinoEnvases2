import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCheckComponent, InputComponent, InputRadioComponent, SelectComponent } from '../../components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, SelectComponent, InputRadioComponent, InputCheckComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputComponent, SelectComponent, InputRadioComponent, InputCheckComponent],
})
export class InputsModule {}
