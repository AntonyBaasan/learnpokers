import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../components/shared/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [PageWrapperComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
