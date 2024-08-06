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
    private translate: TranslateService,
    private projectDetailsService: ProjectDetailsService
  ) {}
  ngAfterViewInit(): void {
    this.pageTitleAnimation();
    this.projectContainerAnimation();
  }

  scrollPageToBegining() {
    const subs$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('opa');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    this.subscription.add(subs$);
  }

  pageTitleAnimation() {
    gsap.fromTo(
      this.page_title.nativeElement,
      { y: '-200%' },
      {
        y: 0,
        ease: 'back.out(1.9)',
        scrollTrigger: {
          start: 'top 40%',
          end: 'top 30%',
          trigger: this.page_title.nativeElement,
          scrub: 2.5,
          markers: false, // Optional for debugging
        },
      }
    );
  }

  projectContainerAnimation(): void {
    this.projectBackgroundElements.forEach((element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: 'top 78%',
          end: 'top 74%',
          trigger: element.nativeElement,
          toggleActions: 'restart reverse',
          scrub: 3,
          markers: false, // Optional for debugging
        },
      });
      tl.fromTo(
        element.nativeElement,
        {
          width: '103%',
          ease: 'power1.in', // Slows in
        },
        {
          width: 0,
          ease: 'power1.in', // Slows in
          transformOrigin: '0% 100%',
        }
      );
      tl.to(element.nativeElement.nextElementSibling, {
        top: 0,
        ease: 'expoScale(0.5,7,none)',
      });
    });
  }

  navigatoToDetails(projectTitle: string): void {
    this.translate.get(projectTitle).subscribe((title) => {
      this.projectDetailsService.setData({
        title: title,
        description: '',
      });
      this.router.navigate(['project-details']);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
