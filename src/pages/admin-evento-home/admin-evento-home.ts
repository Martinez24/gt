import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AdminEventoSubirPage } from "../admin-evento-subir/admin-evento-subir";

/**
 * Generated class for the AdminEventoHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-admin-evento-home',
  templateUrl: 'admin-evento-home.html',
})
export class AdminEventoHomePage {

  constructor(private modalctrl: ModalController ) {
  }

  mostrar_modal(){
    let modal = this.modalctrl.create( AdminEventoSubirPage );
    modal.present();
  }

}
