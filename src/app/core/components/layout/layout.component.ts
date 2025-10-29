import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent {
  constructor() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
