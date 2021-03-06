import { NgModule, Provider } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ServiceWorkerModule } from '@angular/service-worker'
import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import uaLocale from '@angular/common/locales/ru-UA'

import { AppComponent } from './app.component'
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component'
import { HomePageComponent } from './home-page/home-page.component'
import { PostPageComponent } from './post-page/post-page.component'
import { PostComponent } from './shared/components/post/post.component'
import { AppRoutingModule } from './app-routing.module'
import { ErrorPageComponent } from './error-page/error-page.component'
import { SharedModule } from './shared/shared.module'
import { AuthInterceptor } from './shared/auth.interceptor'
import { environment } from '../environments/environment'

registerLocaleData(uaLocale, 'ua')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {}
