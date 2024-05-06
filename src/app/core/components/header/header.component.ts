import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private translateService: TranslateService,
    private animation: AnimationService
  ) {}

  public defineTranslation(lang: string) {
    this.translateService.use(lang);
    this.animation.startAnimation$.next(true);
  }
}
