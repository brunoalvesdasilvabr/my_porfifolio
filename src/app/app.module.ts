import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './sections/home/home.component';
import { AboutComponent } from './sections/about/about.component';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        HeaderComponent,
        ProjectsComponent,
        LayoutComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule,
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
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
