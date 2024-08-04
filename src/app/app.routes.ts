import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'features', loadComponent: () => import('./pages/features-page/features-page.component').then(mod => mod.FeaturesPageComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact-page/contact-page.component').then(mod => mod.ContactPageComponent) },
  { path: 'play', loadComponent: () => import('./pages/play-page/play-page.component').then(mod => mod.PlayPageComponent) },
  { path: '**', component: PageNotFoundComponent }
];
