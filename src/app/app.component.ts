import {Component} from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  template: `

    <app-nav-bar></app-nav-bar>
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavBarComponent],
})
export class AppComponent {
  title = 'groupProj'; 
}
