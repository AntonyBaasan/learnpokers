import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './features-page.component.html',
  styleUrl: './features-page.component.scss'
})
export class FeaturesPageComponent {

}
