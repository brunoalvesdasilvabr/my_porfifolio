import { ElementRef, Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class MySvgAnimationService {
  private mySvg!: ElementRef;
  private myPic!: ElementRef;
  private animationTimeline: gsap.core.Timeline | null = null;

  constructor() {}

  set setMySvg(mySvg: ElementRef) {
    this.mySvg = mySvg;
  }
  set setMyPic(myPic: ElementRef) {
    this.myPic = myPic;
  }
  public startSvgAnimation(): void {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    const paths = Array.from(
      this.mySvg.nativeElement.querySelectorAll('path')
    ).slice(85, 104);

    gsap.set(paths, {
      willChange: 'transform, stroke-dashoffset, stroke, fill',
    });

    tl.fromTo(
      paths,

      {
        fill: 'none',
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        ease: 'power.out',
      },
      {
        duration: 1.5,
        stagger: 0.1,
        stroke: '#6fffe9',
        fill: '#8499B1',
        strokeDasharray: 0,
        strokeDashoffset: 0,
        ease: 'power.out',
      }
    ),
      { willChange: 'transform, stroke-dashoffset, stroke, fill' };

    this.animationTimeline = tl;
  }
  public startScrollAnimation(): void {
    setTimeout(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        this.myPic.nativeElement,
        { display: 'block' },

        {
          opacity: 1,
          filter: 'drop-shadow(0px 0px 15px black)',
          scrollTrigger: {
            start: '65% 60%',
            end: '64% 55%',
            trigger: this.myPic.nativeElement,
            toggleActions: 'restart reverse',
            scrub: true,
            markers: false,
          },
          onComplete: () => {
            this.animationTimeline?.pause();
          },
          onReverseComplete: () => {
            this.animationTimeline?.play();
          },
        }
      );
    }, 500);
  }
}
