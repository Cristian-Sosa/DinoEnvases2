import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./assets/menu-icon.component.sass', './assets/toolbar.component.sass']
})
export class ToolbarComponent {
  public showMenu: boolean = false;

  menuHandle = () => this.showMenu = !this.showMenu
}
