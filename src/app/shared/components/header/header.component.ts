import { Component } from '@angular/core';
import {
  faChevronCircleDown,
  faStore,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faChevronCircleDown = faChevronCircleDown;
  faStore = faStore;
}
