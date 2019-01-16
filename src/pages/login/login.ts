import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ResetPage } from '../reset/reset';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private email:string;
  private password: string;

  constructor(public navCtrl: NavController) { }
  
  navigateResetPassword() {
    this.navCtrl.push(ResetPage);
  }

  navigateHome() {
    if ( this.email != "test" || this.password != "test" ){
      return;
    }

    this.navCtrl.push(MainPage);
  }

  navigateRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
