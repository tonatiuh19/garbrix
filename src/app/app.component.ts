import { Component } from '@angular/core';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'garbrix';
  faChevronCircleRight = faChevronCircleRight;
}
