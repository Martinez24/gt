import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs-compat';
//import { map } from 'rxjs-compat/operators';
//import { CargaArchivoCartaProvider } from '../../providers/carga-archivo-carta/carga-archivo';


@IonicPage()
@Component({
  selector: 'page-carta',
  templateUrl: 'carta.html',
})
export class CartaPage {

  cartas: Observable<any[]>;

   constructor(public navCtrl: NavController, 
               public afDB: AngularFireDatabase,
              //private _cap: CargaArchivoCartaProvider
              ) {

     this.cartas = afDB.list('bebidas').valueChanges();
   }
   

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaPage');
  }

}
