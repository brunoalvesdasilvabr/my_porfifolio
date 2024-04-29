import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './sections/home/home.component';
import { AboutComponent } from './sections/about/about.component';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { MySvgPicComponent } from './shared/components/my-svg-pic/my-svg-pic.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en', // Set your default language here
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(http: HttpClient) {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // Adjust path as needed
        },
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
