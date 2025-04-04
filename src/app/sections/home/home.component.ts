import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { GreetingAnimationService } from 'src/app/shared/services/animations/home/greeting-animation/greeting-animation.service';
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

  constructor(private animation: GreetingAnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startAnimation();
  }

  private startAnimation(): void {
    this.animation.startAnimation$.next(true);
    this.animation.setElements(this.greeting, this.name, this.subTitle);
    this.homeTitle$ = this.animation.homeTitleProps$;
  }
  public setDinamicYearsOfExperience(description: string) {
    const currentDate = new Date().getFullYear();
    const calcExperience = (currentDate - 2019).toString();
    const result = description.replace(/\d+/, calcExperience);
    return result;
  }
}
