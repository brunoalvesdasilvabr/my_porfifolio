import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  cleaner$: Subject<void> = new Subject();

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.scrollPagesToTop();
  }
  prepareRouteTransition(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  private scrollPagesToTop(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.cleaner$)
      )
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
  ngOnDestroy(): void {
    this.cleaner$.next();
    this.cleaner$.complete();
  }
}
