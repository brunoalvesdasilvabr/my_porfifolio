import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { Subscription, filter, map } from 'rxjs';
import { ProjectDetailsService } from './projects-details/service/project-details.service';
import { ProjectBoxAnimationService } from 'src/app/shared/services/animations/projects/project-box-animation.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('project_background')
  projectBackgroundElements!: QueryList<ElementRef>;
  subscription = new Subscription();
  @ViewChild('page_title', { static: false }) page_title!: ElementRef;
  constructor(
    private router: Router,
    private projectDetailsService: ProjectDetailsService,
    private projectBoxAnimation: ProjectBoxAnimationService
  ) {}
  ngAfterViewInit(): void {
    this.projectBoxAnimationInit();
  }

  private projectBoxAnimationInit(): void {
    this.projectBoxAnimation.setprojectBackgroundElements =
      this.projectBackgroundElements;
    this.projectBoxAnimation.setPageTitle = this.page_title;
    this.projectBoxAnimation.pageTitleAnimation();
    this.projectBoxAnimation.projectContainerAnimation();
  }

  scrollPageToBegining() {
    const subs$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    this.subscription.add(subs$);
  }

  navigatoToDetails(projectTitle: string): void {
    this.projectDetailsService.setData({
      title: projectTitle,
      description: '',
    });
    this.router.navigate(['project-details']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
