import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { ProjectDetailsService } from './service/project-details.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
  standalone: true,
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  projectTitle!: string;
  subscription = new Subscription();
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getDataFromStorageAndTranslate();
    this.handleTolanguageChange();
  }
  private handleTolanguageChange() {
    const subs$ = this.translate.onLangChange
      .pipe(
        switchMap(() => {
          return this.projectDetailsService.data$;
        }),
        switchMap((data) => {
          return this.translate.get(data.title);
        })
      )
      .subscribe((projectTitle) => {
        this.projectTitle = projectTitle;
      });

    this.subscription.add(subs$);
  }
  private getDataFromStorageAndTranslate(): void {
    const subs$ = this.projectDetailsService.data$
      .pipe(
        switchMap((data) => {
          return this.translate.get(data.title);
        })
      )
      .subscribe((projectTitle) => {
        this.projectTitle = projectTitle;
      });
    this.subscription.add(subs$);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
