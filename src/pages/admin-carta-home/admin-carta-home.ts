import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AdminCartaAddPage } from "../admin-carta-add/admin-carta-add";

//import { AngularFireDatabase } from "angularfire2/database";
//import { Observable } from 'rxjs/Observable';
import { CartaAddProvider } from '../../providers/carta-add/carta-add';
import { AdminCartaEditPage } from '../admin-carta-edit/admin-carta-edit';
import { ToastProvider } from '../../providers/toast/toast';
import { CartaItem } from '../../providers/carta-add/CartaItem';



@IonicPage()
@Component({
  selector: 'page-admin-carta-home',
  templateUrl: 'admin-carta-home.html',
})
export class AdminCartaHomePage {
  
    //cartaList$: Observable<CartaItem[]>;

    cartaList: CartaItem[];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              //private DB: AngularFireDatabase,
              private actionSheet: ActionSheetController,
              private PrCa: CartaAddProvider,
              private toastCtrl: ToastProvider) {
      /*
        Listado de la tabla en firebase
      */
                this.PrCa.getCarta()
                    .snapshotChanges()
                    .subscribe(item => {
                      this.cartaList = [];
                      item.forEach(element =>{
                        let x = element.payload.toJSON();
                        x["$key"] = element.key;
                        this.cartaList.push(x as CartaItem);
                      })
                    })
      // this.cartaList$ = this.PrCa
      //     .getCarta() //DB list
      //     .snapshotChanges() // key and value
      //     .map(
      //       changes =>{
      //         return changes.map(c => ({
      //           key: c.payload.key, ...c.payload.val()
      //         }));
      //       }
      //     );
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCartaHomePage');
  }
  //Go to the admin-carta-add
  goCartaAdd(){
    this.navCtrl.push(AdminCartaAddPage);
  }
  
  selectCartaItem(cartaItem: CartaItem){
    /* Display an action that gives the user the following options
      1.Edit 
      2. Delete
      3. Cancel
    */
    this.actionSheet.create({
      title: `${cartaItem.titulo}`,
      buttons:[
        {
          text: 'Editar',
          handler:()=>{
          this.navCtrl.push(AdminCartaEditPage,this.PrCa.selectedProduct= Object.assign({}, cartaItem));
           //this.navParams.get("cartaItem: cartaItem"));
          
          }
        },
        {
        text: 'Delete',
        role: 'destructive',
        handler: () =>{
          //Delete the currente CartaItem
        if(confirm('Are you sure delete this item?')){
          this.PrCa.deleteCarta(cartaItem.$key);
          this.toastCtrl.show(`${cartaItem.titulo} deleted`);
        }
        }
        },
        {
        text:'Cancel',
        role:'cancel',
        handler:()=>{
          console.log("El usuario cancelo.");
        }
        }
      ]
    }).present();

  }

}
