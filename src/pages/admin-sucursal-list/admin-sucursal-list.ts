import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AdminSucursalSubirPage } from '../admin-sucursal-subir/admin-sucursal-subir';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-admin-sucursal-list',
  templateUrl: 'admin-sucursal-list.html',
})
export class AdminSucursalListPage {

  sucursales: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public Db: AngularFireDatabase
    ) {
      this.sucursales = this.Db.list('sucursales').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalListPage');
  }
  mostrar_modal(){
    let modal = this.modalCtrl.create(AdminSucursalSubirPage);
    modal.present();
  }

}
