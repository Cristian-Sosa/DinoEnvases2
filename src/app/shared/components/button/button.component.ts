import { Component, Input } from '@angular/core';
import { IButton } from '../../models';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
@Input() button! : IButton;
}