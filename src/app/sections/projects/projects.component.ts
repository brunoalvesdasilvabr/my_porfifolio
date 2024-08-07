import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { ProjectDetailsService } from './projects-details/service/project-details.service';
import { ProjectBoxAnimationService } from 'src/app/shared/services/animations/projects/project-box-animation.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('project_background')
  projectBackgroundElements!: QueryList<ElementRef>;
  @ViewChild('projectsContainer', { static: false })
  projectsContainer!: ElementRef;
  subscription = new Subscription();
  @ViewChild('page_title', { static: false })
  page_title!: ElementRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService,
    private projectBoxAnimation: ProjectBoxAnimationService
  ) {}
  ngAfterViewInit(): void {
    this.projectBoxAnimationInit();
    this.scrollToProjectsSection();
  }
  private scrollToProjectsSection() {
    if (this.route.snapshot.params) {
      window.scrollTo({
        top:
          this.projectsContainer.nativeElement.getBoundingClientRect().top -
          120,
        behavior: 'smooth',
      });
    }
  }

  private projectBoxAnimationInit(): void {
    this.projectBoxAnimation.setprojectBackgroundElements =
      this.projectBackgroundElements;
    this.projectBoxAnimation.setPageTitle = this.page_title;
    this.projectBoxAnimation.pageTitleAnimation();
    this.projectBoxAnimation.projectContainerAnimation();
  }

  public navigatoToDetails(
    title: string,
    projectDetails: string,
    keySkills: string
  ): void {
    this.projectDetailsService.setData({
      title,
      projectDetails,
      keySkills,
    });
    this.router.navigate(['project-details']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
