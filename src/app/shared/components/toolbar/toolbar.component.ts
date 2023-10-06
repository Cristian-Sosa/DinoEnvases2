import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./assets/menu-icon.component.sass', './assets/toolbar.component.sass']
})
export class ToolbarComponent implements OnInit{
  private router = inject(Router);
  showHamburgerMenu: boolean = false;
  
  public showMenu: boolean = false;

  menuHandle = (): boolean => this.showMenu = !this.showMenu;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const lastRoute = event.url;
        console.log(lastRoute)
  
        // Verifica si la última ruta es igual a "DinoEnvases"
        if (lastRoute === '/DinoEnvases' || lastRoute === '/') {
          this.showHamburgerMenu = false;
        } else {
          this.showHamburgerMenu = true;
        }
      }
    });
  }
}
