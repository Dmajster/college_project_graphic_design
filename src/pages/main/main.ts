import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, ModalController, Modal } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { BillingPage } from '../billing/billing';
import { SearchComponent } from '../../components/search/search';
import { RoutePage } from '../route/route';

declare var L;



@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  map: any;
  locationRetryInterval;

  distance: number;
  time:number;
  routeModal: Modal;

  @ViewChild(SearchComponent) search;

  constructor (
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private geolocation: Geolocation,
    public modalCtrl: ModalController
  ) {
    menuCtrl.swipeEnable(false);
  }

  goToBilling() {
    this.navCtrl.push(BillingPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
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

  getItems(event){
  }

  async loadMap(latitude: Number, longitude: Number){
    if(this.map != null){
      this.map.off();
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: false
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '',
    }).addTo(this.map);
    


    
    L.marker([latitude, longitude]).addTo(this.map);
  }

  toggleMenu()
  {
    this.menuCtrl.toggle();
  }

  displayRouteModal() {
    this.routeModal = this.modalCtrl.create(RoutePage, { 
      distance: this.distance,
      time: this.time
    });
    
    this.routeModal.present();
  }

  updateMap(path: any[]){
    console.log("path",this.search.path);

    let waypoints = this.search.path.map(point => {
      return L.latLng(point.y, point.x)
    });

    console.log("fixed path", waypoints);

    


    let routeControl = L.Routing.control({
      showAlternatives: true,
      waypoints: waypoints
    }).addTo(this.map);

    routeControl.on('routesfound', (event) => {
      this.distance = event.routes[0].summary.totalDistance;
      this.time = event.routes[0].summary.totalTime;
      console.log(this.distance, this.time);
    });

    
    
    /*
    L.Routing.itinerary({
      show:false
    });
    */
  }
}
