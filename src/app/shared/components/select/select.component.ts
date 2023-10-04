import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelect } from '../../models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent {
  public selectedIndex!: number | null;

  @Input() select!: ISelect;

  private _onChange: Function = (_value: any) => {};
  private _onTouch: Function = (_value: any) => {};

  changeValue = (event: Event) =>
    this._onChange((<HTMLInputElement>event.target).value);

  writeValue(obj: any): void {
    this.selectedIndex = obj;
  }

  registerOnChange(fn: Function): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
}
