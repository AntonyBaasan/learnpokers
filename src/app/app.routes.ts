import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FeaturesPageComponent } from './pages/features-page/features-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', component: PageNotFoundComponent }
];
