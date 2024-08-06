import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { MySvgAnimationService } from '../../services/animations/home/my-svg-animation/my-svg-animation.service';

@Component({
  selector: 'app-my-svg-pic',
  templateUrl: './my-svg-pic.component.html',
  styleUrls: ['./my-svg-pic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MySvgPicComponent implements AfterViewInit {
  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef;
  @ViewChild('myPic', { static: false }) myPic!: ElementRef;
  constructor(private mySvgAnimationService: MySvgAnimationService) {}

  ngAfterViewInit(): void {
    this.mySvgAnimationService.setMySvg = this.mySvg;
    this.mySvgAnimationService.setMyPic = this.myPic;
    this.mySvgAnimationService.startSvgAnimation();
    this.mySvgAnimationService.startScrollAnimation();
  }
}
