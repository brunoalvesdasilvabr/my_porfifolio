import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.scrollPagesToTop();
  }

  private scrollPagesToTop(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
