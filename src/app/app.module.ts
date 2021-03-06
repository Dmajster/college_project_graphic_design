import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetPage } from '../pages/reset/reset';
import { MainPage } from '../pages/main/main';
import { Geolocation } from '@ionic-native/geolocation';
import { SearchComponent } from '../components/search/search';
import { BillingPage } from '../pages/billing/billing';
import { ProfilePage } from '../pages/profile/profile';
import { RoutePage } from '../pages/route/route';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    LoginPage,
    RegisterPage,
    ResetPage,
    SearchComponent,
    BillingPage,
    ProfilePage,
    RoutePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    LoginPage,
    RegisterPage,
    ResetPage,
    SearchComponent,
    BillingPage,
    ProfilePage,
    RoutePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
