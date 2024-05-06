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
        duration: 4,
        stagger: 0.1,
        stroke: '#6fffe9',
        fill: '#8499B1',
        strokeDasharray: 0,
        strokeDashoffset: 0,
        ease: 'power.out',
      }
    );
  }
}
