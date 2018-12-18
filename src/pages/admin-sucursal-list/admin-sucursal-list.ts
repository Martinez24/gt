import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AdminSucursalSubirPage } from '../admin-sucursal-subir/admin-sucursal-subir';

/**
 * Generated class for the AdminSucursalListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-sucursal-list',
  templateUrl: 'admin-sucursal-list.html',
})
export class AdminSucursalListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalListPage');
  }
  mostrar_modal(){
    let modal = this.modalCtrl.create(AdminSucursalSubirPage);
    modal.present();
  }

}
