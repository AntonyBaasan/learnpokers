import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
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
