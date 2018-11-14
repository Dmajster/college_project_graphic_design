import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

declare var L;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  map: any;
  
  constructor (
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) {
    menuCtrl.swipeEnable(false);
  }


  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '',
    }).addTo(this.map);
  }

  toggleMenu()
  {
    this.menuCtrl.enable(!this.menuCtrl.isEnabled);
  }
}
