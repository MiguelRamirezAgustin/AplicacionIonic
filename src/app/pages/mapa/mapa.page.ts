import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  GoogleMaps: any;
  
  map:GoogleMap;

  title;


  constructor( public loadingContro: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform) { }

  ngOnInit() {
    //await  this.platform.ready();
    // this.loaderControl()
     this.pintarMapa();
  }


  pintarMapa(){
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 19.3737093,
          lng: -99.1787103
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
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'Mi ubicacion',
        icon: 'green',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }



}
