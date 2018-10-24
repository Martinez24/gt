import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";

@IonicPage()
@Component({
  selector: 'page-evento-detalle',
  templateUrl: 'evento-detalle.html',
})
export class EventoDetallePage {
evento: any ={key: null, imagenes: null, titulo: null};
key: null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _cap: CargaArchivoProvider) {
    this.evento.key = navParams.get('key');
    _cap.getEvento(this.evento.key)
        .valueChanges().subscribe(evento=>{
          this.evento = evento;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoDetallePage');
  }

}
