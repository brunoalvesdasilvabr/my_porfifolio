import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { combineLatest, subscribeOn } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef;
  @ViewChild('greeting', { static: false }) greeting!: ElementRef;
  @ViewChild('name', { static: false }) name!: ElementRef;
  @ViewChild('subTitle', { static: false }) subTitle!: ElementRef;
  homeTitle = {
    greeting: [''],
    name: [''],
  };
  constructor(private translate: TranslateService) {
    this.getTransations();
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      gsap.from(this.greeting.nativeElement.querySelectorAll('.letter'), {
        duration: 0.1, // Animation duration in seconds
        opacity: 0,
        y: '-100%',
        skewX: 30,
        scaleY: 0.9,
        filter: 'blur(5px)',
        stagger: 0.1,
        ease: 'bounce', // Bouncy ease for a fun effect (optional)
      });
      gsap.from(this.name.nativeElement.querySelectorAll('.letter'), {
        duration: 0.1, // Animation duration in seconds
        opacity: 0,
        y: '-100%',
        skewX: 30,
        scaleY: 0.9,
        filter: 'blur(5px)',
        delay: 1,
        stagger: 0.1,
        ease: 'bounce', // Bouncy ease for a fun effect (optional)
      });

      gsap.from(this.subTitle.nativeElement, {
        duration: 1, // Animation duration in seconds
        y: '100%',
        delay: 1,
        opacity: 0,
        // ease: 'bounce', // Bouncy ease for a fun effect (optional)
      });
    }, 100);
  }

  getTransations() {
    combineLatest([
      this.translate.get('home.greeting'),
      this.translate.get('home.name'),
    ]).subscribe(([greeting, name]) => {
      this.homeTitle.greeting = greeting.split('');
      this.homeTitle.name = name.split('');
    });
  }
  switchLanguage(langCode: string) {
    this.translate.use(langCode);
  }
}
