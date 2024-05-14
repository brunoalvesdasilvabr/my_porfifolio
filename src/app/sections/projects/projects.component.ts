import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('project_background')
  projectBackgroundElements!: QueryList<ElementRef>;
  @ViewChild('page_title', { static: false }) page_title!: ElementRef;
  ngAfterViewInit(): void {
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
    this.projectContainerAnimation();
  }

  projectContainerAnimation(): void {
    this.projectBackgroundElements.forEach((element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: 'top 68%',
          end: 'top 63%',
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
}
