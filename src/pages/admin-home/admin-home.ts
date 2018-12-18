
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from "../../pages/login/login";
import { AdminEventoHomePage } from "../../pages/admin-evento-home/admin-evento-home";
import { AdminCartaHomePage } from '../../pages/admin-carta-home/admin-carta-home';
import { AdminUsersListPage } from '../admin-users-list/admin-users-list';
//import { AdminUsersPage } from "../../pages/admin-users/admin-users";
import { AdminMenuReservacionPage } from '../admin-menu-reservacion/admin-menu-reservacion';



@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public authProvider: AuthProvider) {
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
}
