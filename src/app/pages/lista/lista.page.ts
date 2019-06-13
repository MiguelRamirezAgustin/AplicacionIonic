import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  informacion:any;
  ocultar1: null ;
 
 valor='nombre'
  fechaActua:any;

  // fechaActual= new Date().getDay() + '/' + new Date().getMonth() + '/' +new Date().getFullYear();


  addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}


  hoyFecha(){
    var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
        dd = this.addZero(dd);
        mm = this.addZero(mm);
        this.fechaActua= dd+'/'+mm+'/'+yyyy;
        return dd+'/'+mm+'/'+yyyy;
    
  }

  constructor(public http:HttpClient,public router:Router, ) {
    // this.http.get('/assets/information.json').subscribe(resultado=>{
    // this.inforomacion= resultado;
    // console.log('Informacion Json ', this.inforomacion);
    // })
   }

  ngOnInit() {
    this.hoyFecha()
    this.obtenerDatos();
    console.log('Fechas.. ', this.fechaActua)
  }




  obtenerDatos(){
    this.http.get('/assets/informacionDemo.json').subscribe((result:any)=>{
      this.informacion= result['jsonFicha'];
       console.log('el resultado es ', JSON.stringify(this.informacion));
          // for(var i=0; i<this.informacion.length; i++){
          //   this.informacion[i]
          //  }
         // this.informacion[index].open = !this.informacion[index].open
    })
  }


  detalle(i){
    if(this.ocultar2(i)){
       this.ocultar1= null;
    }else{
      this.ocultar1= i;
    }
    console.log('Datos detalle ', JSON.stringify(i))
     
  }

  ocultar2(i){
      return this.ocultar1===i;
  }


  verMapa(){
     console.log('login');
     this.router.navigateByUrl('/mapa');
   }

}





// showHideButtons(i) {
//   if(this.isChooseTypeClicked(i)) {
//     this.chooseTypeClicked = null;
//   } else {
//     this.chooseTypeClicked = i;

//   }
//   this.heartType =
//     this.heartType === "arrow-down" ? "arrow-up" : "arrow-down";
// }

// isChooseTypeClicked(i){
//   return this.chooseTypeClicked === i;

// }