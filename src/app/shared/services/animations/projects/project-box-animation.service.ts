import { ElementRef, Injectable, QueryList } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class ProjectBoxAnimationService {
  private backgroundElements!: QueryList<ElementRef>;
  private pageTitle!: ElementRef;

  constructor() {}

  set setprojectBackgroundElements(BackgroundElements: QueryList<ElementRef>) {
    this.backgroundElements = BackgroundElements;
  }
  set setPageTitle(PageTitle: ElementRef) {
    this.pageTitle = PageTitle;
  }

  public pageTitleAnimation(): void {
    gsap.fromTo(
      this.pageTitle.nativeElement,
      { y: '-200%' },
      {
        y: 0,
        ease: 'back.out(1.9)',
        scrollTrigger: {
          start: 'center 55%',
          end: '90% 20%',
          trigger: this.pageTitle.nativeElement,
          scrub: 2.5,
          markers: false, // Optional for debugging
        },
      }
    );
  }

  public projectContainerAnimation(): void {
    this.backgroundElements.forEach((element) => {
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
          ease: 'power1.in',
        },
        {
          width: 0,
          stagger: 0.1,
          ease: 'power1.in',
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
