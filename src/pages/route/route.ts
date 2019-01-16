import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {

  distance: number = 0;
  time: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl:ViewController, params: NavParams) {
      this.distance = params.get("distance");
      this.time = params.get("time");
  }
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}
