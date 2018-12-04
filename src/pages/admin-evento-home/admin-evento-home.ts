import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, ActionSheetController } from 'ionic-angular';
import { AdminEventoSubirPage } from "../admin-evento-subir/admin-evento-subir";
import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";
import { ArchivoSubir } from "../../providers/carga-archivo/ArchivoSubir";
import { ToastProvider } from '../../providers/toast/toast';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminEventoEditPage } from '../../pages/admin-evento-edit/admin-evento-edit';

@Component({
  selector: 'page-admin-evento-home',  
  templateUrl: 'admin-evento-home.html',
})
export class AdminEventoHomePage {
  //hayMas:boolean= true;
  eventos: Observable<any[]>
   @ViewChild('myNav') nav: NavController;

  constructor(private modalctrl: ModalController,
              public navCtrl: NavController,
              private actionSheet: ActionSheetController,
              private toastCtrl: ToastProvider,
              public _cap: CargaArchivoProvider,
              public afDB: AngularFireDatabase
              ) {
  
  this.eventos = afDB.list('evento').valueChanges();
   
  }
  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //   this._cap.cargar_imagenes().then(
  //     (hayMas:boolean)=>{
  //       console.log(hayMas);
  //       this.hayMas = hayMas;
  //       infiniteScroll.complete();
  //     }
  //   );
  // }
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
            this.navCtrl.push(AdminEventoEditPage,this._cap.selectedEventoItem= Object.assign({}, eventoItem));
            console.log(eventoItem);
                     
          }
        },
        {
        text: 'Delete',
        role: 'destructive',
        handler: () =>{
          //Delete the currente CartaItem
        if(confirm('¿Estás seguro de eliminar este registro?')){
          this._cap.deleteEvento( eventoItem.key, eventoItem.img);
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