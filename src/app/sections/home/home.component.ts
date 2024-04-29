import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef;
  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('subTitle', { static: false }) subTitle!: ElementRef;
  words: string[] = [];
  constructor() {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.words = 'Olá! Eu sou o Bruno'.split('');

    console.log(this.words);
  }

  ngAfterViewInit(): void {
    gsap.from(this.title.nativeElement.querySelectorAll('.letter'), {
      duration: 0.4, // Animation duration in seconds
      opacity: 0,
      y: '-200%',
      skewY: 100,
      skewX: 30,
      scaleY: 0.9,
      filter: 'blur(10px)',
      stagger: 0.1,
      ease: 'bounce', // Bouncy ease for a fun effect (optional)
    });

    gsap.from(this.subTitle.nativeElement, {
      duration: 1, // Animation duration in seconds
      y: '100%',
      delay: 1.5,
      opacity: 0,
      // ease: 'bounce', // Bouncy ease for a fun effect (optional)
    });
  }
}
