import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsAnimation,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  MarkerCluster,
  LatLng,
} from '@ionic-native/google-maps';
import { NavController, Platform, LoadingController, ToastController } from '@ionic/angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { Router, ActivatedRoute } from "@angular/router";
declare var google;



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('map') element;
  // GoogleMaps: any;
  // map:GoogleMap;
  // title;
  // maps: any;


  // loading: any;
  // arg: any;

  Latitude:any;
  Longitude:any;

  
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];


  constructor( public loadingContro: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private geolocation: Geolocation,

    public googleMaps: GoogleMaps, 
    public plt: Platform, 
    public nav: NavController
    ) { 
    

    }

 async ngOnInit() {
    //await  this.platform.ready();
    // this.loaderControl()   
     //this.position();
     this.getMapLocation();
     //this.pintarMapa();
     console.log('Mapa----!!!');
     this.getPosition();
  }


// position(){
//     this.geolocation.getCurrentPosition().then((resp)=>{
//        console.log('postiton',  resp)
//     }).catch((error) => {
//       console.log('Error  location', error);
//     });
//  }

  getMapLocation() {
     navigator.geolocation.getCurrentPosition
     (this.onMapSuccess, this.onMapError, { enableHighAccuracy: true });
  }

  onMapSuccess (e ) {
    console.log('datos de e', e);
      this.Latitude = e.coords.latitude;
      this.Longitude = e.coords.longitude;
  }

 onMapError(e){
  console.log('Datos de error ', e);
  }

  

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      console.log('Datos Response ', response);
      this.loadMap(response);
    })
    .catch(error =>{
      console.log('Error de datos ',error);
    })
  }


  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log('Latitudes .....>>>>  ', latitude, longitude);
    
    let mapEle: HTMLElement = document.getElementById('map');
  
    let myLatLng = {lat: latitude, lng: longitude};
  
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
    
  }





  /*
  pintarMapa(){
    console.log('Pintar mapa ' );
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.Latitude,
          lng: this.Latitude
        },
        zoom: 18,
        tilt: 30
      }
    })
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });
  }

   getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      console.log('location ---> ', response);
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'Mi ubicacion',
        icon: 'orange',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }*/

}
