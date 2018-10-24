import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AdminEventoSubirPage } from "../admin-evento-subir/admin-evento-subir";
import { AdminEventoDetailPage } from "../../pages/admin-evento-detail/admin-evento-detail";
import { EventosServiceProvider } from "../../providers/eventos-service/eventos-service";


@Component({
  selector: 'page-admin-evento-home',
  templateUrl: 'admin-evento-home.html',
})
export class AdminEventoHomePage {
    eventos =[];

   @ViewChild('myNav') nav: NavController;

  constructor(private modalctrl: ModalController,
              public navCtrl: NavController,
              public eventoService: EventosServiceProvider ) {
  //this.eventos = eventoService.getEventos();
    eventoService.getEventos()
                  .valueChanges().subscribe(eventos=>{
                    console.log(eventos);
                    this.eventos = eventos;
                  });
  }
  public goToDetail(id){
    this.navCtrl.push(AdminEventoDetailPage, {id:id});
  }
  public createEvento(){
    this.navCtrl.push(AdminEventoDetailPage, {id:0});
  }
  mostrar_modal(){
    let modal = this.modalctrl.create( AdminEventoSubirPage );
    modal.present();
  }

}
