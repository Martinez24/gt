import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCartaAddPage } from './admin-carta-add';

@NgModule({
  declarations: [
    AdminCartaAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCartaAddPage),
  ],
})
export class AdminCartaAddPageModule {}
