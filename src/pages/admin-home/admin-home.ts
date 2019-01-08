
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from "../../pages/login/login";
import { AdminEventoHomePage } from "../../pages/admin-evento-home/admin-evento-home";
import { AdminCartaHomePage } from '../../pages/admin-carta-home/admin-carta-home';
import { AdminUsersListPage } from '../admin-users-list/admin-users-list';
//import { AdminUsersPage } from "../../pages/admin-users/admin-users";
import { AdminMenuReservacionPage } from '../admin-menu-reservacion/admin-menu-reservacion';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';
import { AdminSucursalPerfilPage } from '../admin-sucursal-perfil/admin-sucursal-perfil';

//import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';





@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  //sucursal: Credenciales = {};
  //data: any = {};
  email: string;
  displayName: string;
  uid: string;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public authProvider: AuthProvider,
      public sucProv: SucursalAltaProvider,
      public firebase: AngularFireAuth
      ) {
    var sucursal = this.firebase.auth.currentUser;
    
    if(sucursal != null ){
      this.uid = sucursal.uid;
      this.email = sucursal.email;
      
      // photoURL = sucursal.photoURL;
      // uid = sucursal.uid;
    }
    console.log('Este es el UID de la sucursal '+sucursal.uid);
    console.log('Este es el correo de la sucursal '+sucursal.email);
  }
  ionViewDidLoad() {
    console.log('HOME PAGE');
  }

  logout() {
  	this.authProvider.logout();
  	this.navCtrl.setRoot(LoginPage);
  }
goUsers(){
  this.navCtrl.push(AdminUsersListPage);
}
 goEventos(){
   this.navCtrl.push(AdminEventoHomePage);
 }
 goCarta(){
   this.navCtrl.push(AdminCartaHomePage);
 }
 goReservacion(){
  this.navCtrl.push(AdminMenuReservacionPage);
 }
 goPerfilSucursal(uid){
  this.navCtrl.push(AdminSucursalPerfilPage, {uid:uid});
 }
}
