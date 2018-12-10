import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminUsersPage } from '../admin-users/admin-users';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-admin-users-guest',
  templateUrl: 'admin-users-guest.html',
})
export class AdminUsersGuestPage {
  
  admins: Observable<any[]>;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public DB: AngularFireDatabase,
    public modalCtrl: ModalController,
    public actionSheet: ActionSheetController,
    public _up: UserProvider
    ) 
  {   
    this.admins = this.DB.list('users').valueChanges();   
    //var admins = firebase.database().ref('/users').orderByChild('type').equalTo('a');
    console.log(this.admins);    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsersGuestPage');
  }
  
  mostrar_modal(){
    let modal = this.modalCtrl.create(AdminUsersPage);
    modal.present();
  }

  selectUsuario(uid){
    this.actionSheet.create({
      title: 'Acciones',
      buttons:[
        // {
        //   text: 'Editar',
        //   handler:()=>{
        //     //Aqui va el codigo 
        //   }
        // },
        // {
        //   text:'Inhabilitar cuenta',
        //   role: 'destructive',
        //   handler:()=>{
        //     //Aqui va el codigo 
        //   } 
        // },
        {
          text:'Eliminar',
          role: 'destructive',
          handler:()=>{
           if(confirm('¿Estas seguro de eliminar este usuario?')){
             this._up.delete_user(uid);
            console.log('Se elimino');
            
           }
          }
        },
        {
          text:'Cancel',
          role:'cancel',
          handler:()=>{
            console.log("Cancelo");
            
          }
        }
      ]
    }).present();
  }
  

}
