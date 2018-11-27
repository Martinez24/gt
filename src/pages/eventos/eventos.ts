import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { EventoDetallePage } from "../../pages/evento-detalle/evento-detalle";


//Plugins
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
//import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {
  //hayMas:boolean= true;
 eventos: Observable<any[]>;

  constructor(//private _cap: CargaArchivoProvider,
              private socialSharing: SocialSharing,
              public navCtrl: NavController,
              private afDB: AngularFireDatabase
  ) {
     this.eventos = afDB.list('evento').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }
  
  compartir( evento:any ){

    this.socialSharing.shareViaFacebook( evento.titulo, null, evento.img )
      .then( ()=>{} ) // se pudo compartir
      .catch( ()=>{} ) // si sucede un error

  }
  verDetalle(key){
    this.navCtrl.push(EventoDetallePage, {key:key});
  }

}
