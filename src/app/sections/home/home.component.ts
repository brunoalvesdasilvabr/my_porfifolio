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
import { Observable } from 'rxjs';
import { AnimationService } from 'src/app/shared/services/animation.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('greeting', { static: false }) greeting!: ElementRef;
  @ViewChild('name', { static: false }) name!: ElementRef;
  @ViewChild('subTitle', { static: false }) subTitle!: ElementRef;
  homeTitle$!: Observable<{ greeting: string[]; name: string[] }>;
  constructor(
    private translate: TranslateService,
    private animation: AnimationService
  ) {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.animation.startAnimation$.next(true);
    this.animation.setElements(this.greeting, this.name, this.subTitle);
    this.homeTitle$ = this.animation.homeTitleProps$;
    // setTimeout(() => {
    //   gsap.from(this.greeting.nativeElement.querySelectorAll('.letter'), {
    //     duration: 0.1, // Animation duration in seconds
    //     opacity: 0,
    //     y: '-100%',
    //     skewX: 30,
    //     scaleY: 0.9,
    //     filter: 'blur(5px)',
    //     stagger: 0.1,
    //     ease: 'bounce', // Bouncy ease for a fun effect (optional)
    //   });
    //   gsap.from(this.name.nativeElement.querySelectorAll('.letter'), {
    //     duration: 0.1, // Animation duration in seconds
    //     opacity: 0,
    //     y: '-100%',
    //     skewX: 30,
    //     scaleY: 0.9,
    //     filter: 'blur(5px)',
    //     delay: 1,
    //     stagger: 0.1,
    //     ease: 'bounce', // Bouncy ease for a fun effect (optional)
    //   });

    //   gsap.from(this.subTitle.nativeElement, {
    //     duration: 1, // Animation duration in seconds
    //     y: '100%',
    //     delay: 1,
    //     opacity: 0,
    //     // ease: 'bounce', // Bouncy ease for a fun effect (optional)
    //   });
    // }, 100);
  }

  switchLanguage(langCode: string) {
    this.translate.use(langCode);
  }
}
