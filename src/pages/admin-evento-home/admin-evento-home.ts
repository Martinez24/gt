import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, ActionSheetController } from 'ionic-angular';
import { AdminEventoSubirPage } from "../admin-evento-subir/admin-evento-subir";
import { EventosServiceProvider } from "../../providers/eventos-service/eventos-service";
import { CargaArchivoProvider, ArchivoSubir } from "../../providers/carga-archivo/carga-archivo";
import { ToastProvider } from '../../providers/toast/toast';



@Component({
  selector: 'page-admin-evento-home',
  templateUrl: 'admin-evento-home.html',
})
export class AdminEventoHomePage {
  hayMas:boolean= true;

   @ViewChild('myNav') nav: NavController;

  constructor(private modalctrl: ModalController,
              public navCtrl: NavController,
              public eventoService: EventosServiceProvider,
              private actionSheet: ActionSheetController,
              private toastCtrl: ToastProvider,
              public _cap: CargaArchivoProvider
              ) {
  
   
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
  mostrar_modal(){
    let modal = this.modalctrl.create( AdminEventoSubirPage );
    modal.present();
  }
  selectEventoItem(eventoItem: ArchivoSubir){
    /* Display an action that gives the user the following options
      1.Edit 
      2. Delete
      3. Cancel
    */
    this.actionSheet.create({
      title: `${eventoItem.titulo}`,
      buttons:[
        {
          text: 'Editar',
          handler:()=>{
          //this.navCtrl.push(AdminCartaEditPage,this.PrCa.selectedProduct= Object.assign({}, cartaItem));
           //this.navParams.get("cartaItem: cartaItem"));
          
          }
        },
        {
        text: 'Delete',
        role: 'destructive',
        handler: () =>{
          //Delete the currente CartaItem
        if(confirm('Are you sure delete this item?')){
          this._cap.deleteEvento(eventoItem.key);
          this.toastCtrl.show(`${eventoItem.titulo} deleted`);
            
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
