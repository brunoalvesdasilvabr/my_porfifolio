import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';

import * as anime from 'animejs';

@Component({
  selector: 'app-my-svg-pic',
  templateUrl: './my-svg-pic.component.html',
  styleUrls: ['./my-svg-pic.component.scss'],
})
export class MySvgPicComponent implements AfterViewInit {
  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef;

  ngAfterViewInit(): void {
    gsap.fromTo(
      Array.from(this.mySvg.nativeElement.querySelectorAll('path')).slice(
        45,
        202
      ),
      {
        fill: 'none',
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        ease: 'power.out', // Bouncy ease for a fun effect (optional)
      },
      {
        duration: 4, // Animation duration in seconds
        stagger: 0.1,
        stroke: '#6fffe9',
        fill: '#8499B1',
        strokeDasharray: 0,
        strokeDashoffset: 0,
        ease: 'power.out', // Bouncy ease for a fun effect (optional)
      }
    );

    // anime({
    //   targets: this.mySvg.nativeElement,
    //   strokeDashoffset: (el: any) => {
    //     const dashArray = el.getAttribute('stroke-dasharray'); // Get initial dash array
    //     return parseInt(dashArray, 10); // Convert to number
    //   },
    //   strokeDasharray: (el: any) => el.getAttribute('stroke-dasharray'), // Maintain aspect ratio
    //   easing: 'easeInOutQuad',
    //   duration: 500,
    //   direction: 'alternate',
    //   loop: true,
    // });
  }
}
