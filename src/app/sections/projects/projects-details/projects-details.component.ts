import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, forkJoin, map, switchMap } from 'rxjs';
import { ProjectDetailsService } from './service/project-details.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IProjectDetails } from 'src/app/shared/interfaces/project.details.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
  imports: [TranslateModule, RouterModule],
  standalone: true,
})
export class ProjectsDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('projectsContainer', { static: false })
  projectsContainer!: ElementRef;
  projectInfo!: IProjectDetails;
  subscription = new Subscription();
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private translate: TranslateService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDataFromStorageAndTranslate();
    this.handleTolanguageChange();
  }
  ngAfterViewInit(): void {}
  public navigateToPreviousPage(): void {
    this.router.navigate(['']);
  }
  // this.translate.onLangChange
  //     .pipe(
  //       switchMap(() => {
  //         return this.projectDetailsService.data$;
  //       })
  //     )
  //     .pipe(
  //       map((data) => {
  //          combineLatest([
  //           this.translate.get(data.title),
  //           this.translate.get(data.projectDetails),
  //         ]);
  //       }),

  //     )
  private handleTolanguageChange() {
    const subs$ = this.translate.onLangChange
      .pipe(
        switchMap(() => {
          return this.getTranslationFromAllProps();
        })
      )
      .subscribe((res) => {
        this.projectInfo = res;
      });

    this.subscription.add(subs$);
  }
  private getTranslationFromAllProps(): Observable<IProjectDetails> {
    return this.projectDetailsService.data$.pipe(
      switchMap((data) =>
        forkJoin({
          title: this.translate.get(data.title),
          projectDetails: this.translate.get(data.projectDetails),
          keySkills: this.translate.get(data.keySkills),
        })
      )
    );
  }
  private getDataFromStorageAndTranslate(): void {
    const subs$ = this.getTranslationFromAllProps().subscribe((res) => {
      this.projectInfo = res;
    });
    this.subscription.add(subs$);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
