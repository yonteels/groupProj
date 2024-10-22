import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {BrowseComponent } from './browse/browse.component';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: HomeComponent,
  },
  {
    path: 'about',
    title: 'App About Page',
    component: AboutComponent,
  },
  {
    path: 'browse',
    title: 'App Browse Page',
    component: BrowseComponent,
  },
  {
    path: 'browse/:sort/:limit',
    title: 'App Broswe Page',
    component: BrowseComponent,
  },
];
