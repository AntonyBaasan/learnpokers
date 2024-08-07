import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageWrapperComponent } from '../../components/shared/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PageWrapperComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private router: Router) {
  }

  goToLearn() {
    const navigationDetails: string[] = ['/play'];
    this.router.navigate(navigationDetails);
  }
}
