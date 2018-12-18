import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AdminSucursalListPage } from '../admin-sucursal-list/admin-sucursal-list';
import { AdminSucursalSubirPage } from '../admin-sucursal-subir/admin-sucursal-subir';


@IonicPage()
@Component({
  selector: 'page-admin-menu-reservacion',
  templateUrl: 'admin-menu-reservacion.html',
})
export class AdminMenuReservacionPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMenuReservacionPage');
  }

  goSucursal(){
    this.navCtrl.push(AdminSucursalListPage);
  }
 

}
