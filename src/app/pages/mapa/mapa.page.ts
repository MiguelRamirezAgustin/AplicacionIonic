import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsAnimation,
  Marker,
  MyLocation,
} from '@ionic-native/google-maps';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild("map_canvas") mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();


  map_canvas: any;
  ubicacion: any;
  destino: any;
  destinationPosition: any;
  map: GoogleMap;
  request: any;
  status: any;

  map1Ruta: any;

  constructor(public Loader:LoadingController) {

  }

  async presentLoadingWithOptions() {
    const loading = await this.Loader.create({
      spinner: null,
      duration: 400,
      message: 'Cargando..',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }


  async ngOnInit() {
    console.log('Mapa----!!!');
    this.presentLoadingWithOptions();
    //this.rutaMapa();
    this.loadMap();
  }

  ionViewDidLoad() {
    //this.rutaMapa();
    this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create("map_canvas", {
      camera: {
        target: {
          lat: 19.4978,
          lng: -99.1269
        },
        zoom: 18,
        tilt: 30
      }
    });
    console.log("map--------->>" + JSON.stringify(this.map));
    // setTimeout(() => {
    //   this.MostrarMapa();
    //  },200);
  }


  rutaMapa() {
    this.map1Ruta = new google.maps.Map(this.mapElement.nativeElement, {
      camera: {
        target: {
          lat: 19.4978,
          lng: -99.12695
        }
      },
      zoom: 17,
      tilt: 30
    });
    this.directionsDisplay.setMap(this.map1Ruta);
  }

  //Mostrar Ruta
  async MostrarMapa() {
    console.log('mostrar mapa');
    this.map.clear();
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log('Respuesta de localizacion------> ', JSON.stringify(location));

      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      console.log("Datos del mapa---------> " + JSON.stringify(this.map));

      let marker: Marker = this.map.addMarkerSync({
        title: "Mi ubicación...",
        snippet: "Punto de partida.",
        position: location.latLng,
        icon: '#5cb60d',
        //animation: 'DROP',
        animation: GoogleMapsAnimation.BOUNCE
      });
      marker.showInfoWindow();
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        console.log("click------->");
      });
    })
      .catch(err => {
        console.log(err);
      });
  }


  calculateRoute() {
    this.map.clear();
    console.log('Destino---->');
    this.directionsService.route(
      {
        origin: this.ubicacion,
        destination: this.destinationPosition,
        travelMode: 'DRIVING',
        // avoidTolls: true,
        // optimizeWaypoints: true,
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsDisplay.setDirections(response);
        } else {
          console.log("Directions request fallo " + status);
        }
        console.log("response" + JSON.stringify(response));
        console.log("status" + JSON.stringify(status));
      }
    );
   }

}

//Ejemplo para position 
// position(){
  //     this.geolocation.getCurrentPosition().then((resp)=>{
  //        console.log('postiton',  resp)
  //     }).catch((error) => {
  //       console.log('Error  location', error);
  //     });
  //  }

  //   getMapLocation() {
  //      navigator.geolocation.getCurrentPosition
  //      (this.onMapSuccess, this.onMapError, { enableHighAccuracy: true });
  //   }

  //   onMapSuccess (e ) {
  //     console.log('datos de e', e);
  //       this.Latitude = e.coords.latitude;
  //       this.Longitude = e.coords.longitude;
  //   }

  //  onMapError(e){
  //   console.log('Datos de error ', e);
  //   }

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


