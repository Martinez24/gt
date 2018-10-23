
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from "../../pages/login/login";
import { AdminUsersPage } from "../../pages/admin-users/admin-users";
import { AdminEventoHomePage } from "../../pages/admin-evento-home/admin-evento-home";



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
  this.navCtrl.push(AdminUsersPage);
}
 goEventos(){
   this.navCtrl.push(AdminEventoHomePage);
 }
}
