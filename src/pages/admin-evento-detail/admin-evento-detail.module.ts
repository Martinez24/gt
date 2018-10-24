import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEventoDetailPage } from './admin-evento-detail';

@NgModule({
  declarations: [
    AdminEventoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEventoDetailPage),
  ],
})
export class AdminEventoDetailPageModule {}
