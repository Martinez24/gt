import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

//Plugins
import { SocialSharing } from '@ionic-native/social-sharing';

// import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';
import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {
  hayMas:boolean= true;
 //eventos: Observable<any[]>;

  constructor(private _cap: CargaArchivoProvider,
              private socialSharing: SocialSharing
     //private afDB: AngularFireDatabase
  ) {
    // this.eventos = afDB.list('evento').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this._cap.cargar_imagenes().then(
      (hayMas:boolean)=>{
        console.log(hayMas);
        this.hayMas = hayMas;
        infiniteScroll.complete();
      }
    );
  }
  compartir( evento:any ){

    this.socialSharing.shareViaFacebook( evento.titulo, null, evento.img )
      .then( ()=>{} ) // se pudo compartir
      .catch( ()=>{} ) // si sucede un error

  }


}
