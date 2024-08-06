import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GreetingAnimationService } from 'src/app/shared/services/animations/home/greeting-animation/greeting-animation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private translateService: TranslateService,
    private animation: GreetingAnimationService
  ) {}

  public defineTranslation(lang: string) {
    this.translateService.use(lang);
    this.animation.startAnimation$.next(true);
  }
}
