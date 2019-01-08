import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';


@IonicPage()
@Component({
  selector: 'page-admin-sucursal-perfil',
  templateUrl: 'admin-sucursal-perfil.html',
})
export class AdminSucursalPerfilPage {
  sucursal: any = { uid: null, contacto: null , direccion: null, displayName: null, email: null, photoURL: null, status: null, tel: null, tipo: null}
  uid: null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public SucProv: SucursalAltaProvider
    ) {
    this.sucursal.uid = navParams.get('uid');
    SucProv.getSucursal(this.sucursal.uid)
      .valueChanges().subscribe(sucursal =>{
        this.sucursal = sucursal;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalPerfilPage');
    console.log();
    
  }

}
