import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { ProjectDetailsService } from './projects-details/service/project-details.service';
import { ProjectBoxAnimationService } from 'src/app/shared/services/animations/projects/project-box-animation.service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('project_background')
  projectBackgroundElements!: QueryList<ElementRef>;
  @ViewChild('projectsContainer', { static: false })
  projectsContainer!: ElementRef;
  @ViewChild('page_title', { static: false })
  page_title!: ElementRef;
  projects$!: Observable<
    { title: string; website: string; keySkills: string; description: string }[]
  >;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService,
    private projectBoxAnimation: ProjectBoxAnimationService,
    public translate: TranslateService,
    private dataService: DataService
  ) {}
  ngAfterViewInit(): void {
    this.scrollToProjectsSection();
    this.projects$ = this.dataService.isTranslating$.pipe(
      switchMap(() => this.translate.get('projects.items')),
      tap(() => this.projectBoxAnimationInit())
    );
  }

  private scrollToProjectsSection() {
    const topProp =
      this.projectsContainer.nativeElement.getBoundingClientRect().top - 800;
    if (this.route.snapshot.params) {
      window.scrollTo({
        top: topProp,
        behavior: 'smooth',
      });
    }
  }

  private projectBoxAnimationInit(): void {
    this.projectBoxAnimation.setprojectBackgroundElements =
      this.projectBackgroundElements;
    console.log('page title', this.page_title);
    this.projectBoxAnimation.setPageTitle = this.page_title;
    setTimeout(() => {
      this.projectBoxAnimation.pageTitleAnimation();
      this.projectBoxAnimation.projectContainerAnimation();
    });
  }

  public navigatoToDetails(
    title: string,
    projectDetails: string,
    keySkills: string,
    website: string
  ): void {
    this.projectDetailsService.setData({
      title,
      projectDetails,
      keySkills,
      website,
    });
    this.router.navigate(['project-details']);
  }
}
