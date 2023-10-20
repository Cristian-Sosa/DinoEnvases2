import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IInputCheck } from '../../models';

@Component({
  selector: 'app-input-check',
  templateUrl: './input-check.component.html',
  styleUrls: ['./input-check.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckComponent),
      multi: true,
    },
  ],
})
export class InputCheckComponent implements ControlValueAccessor {
  @Input() input!: IInputCheck;

  isChecked: boolean = false;

  onChange: any = () => {};

  onTouched: any = () => {};

  writeValue(value: boolean): void {
    this.isChecked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementar si es necesario
  }

  changeCheck(event: Event): void {
    this.isChecked = (<HTMLInputElement>event.target).checked;
    this.onChange(this.isChecked);
    this.onTouched();
  }
}
