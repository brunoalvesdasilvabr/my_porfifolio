import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GreetingAnimationService {
  private _greetingEl!: ElementRef;
  private _nameEl!: ElementRef;
  private _subTitleEl!: ElementRef;
  private homeTitleElements$ = new BehaviorSubject({
    greeting: [''],
    name: [''],
  });
  private isAnimating = false;
  public startAnimation$ = new BehaviorSubject(false);

  constructor(private translate: TranslateService) {
    this.listenForAnimation();
  }

  public setElements(
    greeting: ElementRef,
    name: ElementRef,
    subTitle: ElementRef
  ) {
    this._greetingEl = greeting;
    this._nameEl = name;
    this._subTitleEl = subTitle;
  }

  get homeTitleProps$(): Observable<{ greeting: string[]; name: string[] }> {
    return combineLatest([this.homeTitleElements$.asObservable()]).pipe(
      map(([homeTitleElements]) => ({
        greeting: homeTitleElements.greeting,
        name: homeTitleElements.name,
      }))
    );
  }
  private getTransations(): void {
    combineLatest([
      this.translate.get('home.greeting'),
      this.translate.get('home.name'),
    ]).subscribe(([greeting, name]) => {
      console.log([greeting, name]);
      this.homeTitleElements$.next({
        greeting: greeting.split(''),
        name: name.split(''),
      });
    });
  }

  private listenForAnimation(): void {
    this.startAnimation$.subscribe((value) => {
      console.log({ value });
      if (value) {
        this.getTransations();
        setTimeout(() => {
          this.initHomeAnimation();
        }, 50);
      }
    });
  }
  private initHomeAnimation(): void {
    try {
      const tl = gsap.timeline();
      if (!this.isAnimating) {
        this.isAnimating = true;
        tl.from(this._greetingEl.nativeElement.querySelectorAll('.letter'), {
          duration: 0.1,
          opacity: 0,
          y: '-100%',
          skewX: 30,
          scaleY: 0.9,
          filter: 'blur(5px)',
          stagger: 0.1,
          ease: 'bounce',
        });
        tl.from(this._nameEl.nativeElement.querySelectorAll('.letter'), {
          duration: 0.1,
          opacity: 0,
          y: '-100%',
          skewX: 30,
          scaleY: 0.9,
          filter: 'blur(5px)',
          stagger: 0.1,
          ease: 'bounce',
        });

        tl.from(this._subTitleEl.nativeElement, {
          duration: 1,
          y: '100%',
          opacity: 0,
          onComplete: () => {
            this.isAnimating = false;
          },
        });
      }
    } catch (err) {
      console.error({ err });
    }
  }
}
