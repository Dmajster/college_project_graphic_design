import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var L;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  map: any;
  locationRetryInterval;

  constructor (
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private geolocation: Geolocation
  ) {
    menuCtrl.swipeEnable(false);
  }


  ionViewDidLoad(){
    this.initializeMap();
  }
 
  async initializeMap() {
    let latitude: number = 0;
    let longitude: number = 0;

    try {
      let response: Geoposition = await this.geolocation.getCurrentPosition();
      latitude = response.coords.latitude;
      longitude = response.coords.longitude;
    } catch(err) {
      console.log(JSON.stringify(err));
      this.locationRetryInterval = setInterval( () => {
        console.log("Retrying to aquire location!");
        this.getLocation();
      }, 10000 );
    }

    this.loadMap(latitude, longitude);
  }

  async getLocation() {
    let latitude: number = 0;
    let longitude: number = 0;
    let error = null;

    try {
      let response: Geoposition = await this.geolocation.getCurrentPosition();
      latitude = response.coords.latitude;
      longitude = response.coords.longitude;
    } catch(err) {
      console.log(JSON.stringify(err));
      error = err;
    }

    if(error != null) {
      return;
    }

    clearInterval(this.locationRetryInterval);
    this.loadMap(latitude, longitude);
  }

  async loadMap(latitude: Number, longitude: Number){
    this.map = L.map('map', {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: false
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '',
    }).addTo(this.map);
  }

  toggleMenu()
  {
    this.menuCtrl.toggle();
  }
}
