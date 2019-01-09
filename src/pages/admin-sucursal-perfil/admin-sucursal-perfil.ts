import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SucursalAltaProvider, Credenciales } from '../../providers/sucursal-alta/sucursal-alta';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AdminSucursalEditperfilPage } from '../admin-sucursal-editperfil/admin-sucursal-editperfil';



@IonicPage()
@Component({
  selector: 'page-admin-sucursal-perfil',
  templateUrl: 'admin-sucursal-perfil.html',
})
export class AdminSucursalPerfilPage {

  sucursal: any = { uid: null, contacto: null , direccion: null, displayName: null, email: null, photoURL: null, status: null, tel: null, tipo: null}
  uid: null;

  // sucursalItem: Credenciales = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public SucProv: SucursalAltaProvider,
    public authProvider: AuthProvider,

    ) {
    this.sucursal.uid = navParams.get('uid');
    SucProv.getSucursal(this.sucursal.uid)
      .valueChanges().subscribe(sucursal =>{
        this.sucursal = sucursal;
      });
  }

  ionViewDidLoad() {
    console.log(this.sucursal.uid);
   // console.log(this.sucursalItem);    
    console.log('ionViewDidLoad AdminSucursalPerfilPage');
  }
  logout() {
  	this.authProvider.logout();
  	this.navCtrl.setRoot(LoginPage);
  }
  goEditPerfil(sucursalItem: Credenciales){
    this.navCtrl.push(AdminSucursalEditperfilPage, this.SucProv.selectedSucursalItem = Object.assign({}, sucursalItem))
    console.log(sucursalItem);
    
  }
  
}
