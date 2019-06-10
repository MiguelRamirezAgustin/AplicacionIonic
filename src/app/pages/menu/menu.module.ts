import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/lista',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
       {
         path: 'lista',
         loadChildren: '../lista/lista.module#ListaPageModule'
       },
       {
        path: 'mapa',
        loadChildren: '../mapa/mapa.module#MapaPageModule'
      }
    ]
  }
];


//{ path: 'lista', loadChildren: './pages/lista/lista.module#ListaPageModule' },
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
