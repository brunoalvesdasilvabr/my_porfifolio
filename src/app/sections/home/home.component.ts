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
import { Observable, ReplaySubject } from 'rxjs';
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
  @ViewChild('contactBtn', { static: false }) contactBtn!: ElementRef;
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
    // gsap.to(this.contactBtn.nativeElement, {
    //   y: 200,
    //   duration: 8,
    //   scrollTrigger: {
    //     start: 'top center',
    //     trigger: this.contactBtn.nativeElement,
    //     toggleActions: 'restart reverse',
    //     scrub: 4,
    //     markers: true,
    //   },
    // });
  }
  setDinamicYearsOfExperience(description: string) {
    const currentDate = new Date().getFullYear();
    const calcExperience = (currentDate - 2019).toString();
    const result = description.replace(/\d+/, calcExperience);
    return result;
  }

  switchLanguage(langCode: string) {
    this.translate.use(langCode);
  }
}
