import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-my-svg-pic',
  templateUrl: './my-svg-pic.component.html',
  styleUrls: ['./my-svg-pic.component.scss'],
})
export class MySvgPicComponent implements AfterViewInit {
  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef;
  @ViewChild('myPic', { static: false }) myPic!: ElementRef;

  ngAfterViewInit(): void {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.fromTo(
      Array.from(this.mySvg.nativeElement.querySelectorAll('path')).slice(
        75,
        202
      ),
      {
        fill: 'none',
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        ease: 'power.out',
      },
      {
        duration: 2,
        stagger: 0.1,
        stroke: '#6fffe9',
        fill: '#8499B1',
        strokeDasharray: 0,
        strokeDashoffset: 0,
        ease: 'power.out',
      }
    );

    tl.to(this.myPic.nativeElement, {
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
    });
  }
}
