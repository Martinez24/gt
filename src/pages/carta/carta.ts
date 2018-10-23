import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs-compat';
//import { map } from 'rxjs-compat/operators';
/**
 * Generated class for the CartaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carta',
  templateUrl: 'carta.html',
})
export class CartaPage {


    items: Observable<any[]>;

   constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
     this.items = afDB.list('products').valueChanges();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaPage');
  }

}
