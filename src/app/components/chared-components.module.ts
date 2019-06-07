import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    //importacion para no marcar erro en html componentes
    IonicModule
  ],
  exports:[ProductComponent]
})
export class CharedComponentsModule { }
