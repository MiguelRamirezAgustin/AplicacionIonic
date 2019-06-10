import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  //{ path: 'lista', loadChildren: './pages/lista/lista.module#ListaPageModule' },
  //{ path: 'mapa', loadChildren: './pages/mapa/mapa.module#MapaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
