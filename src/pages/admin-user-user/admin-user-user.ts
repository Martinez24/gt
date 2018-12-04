import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AdminUserDetailPage } from '../admin-user-detail/admin-user-detail';

/**
 * Generated class for the AdminUserUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-user-user',
  templateUrl: 'admin-user-user.html',
})
export class AdminUserUserPage {
  users: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public DB: AngularFireDatabase,
     public actionSheet: ActionSheetController
     ) {
    this.users = this.DB.list('users_user').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserUserPage');
  }
  selectUsuario(uid){
    this.actionSheet.create({
      title: 'Acciones',
      buttons:[
        {
          text: 'Ver Más',
          handler:()=>{
            this.navCtrl.push(AdminUserDetailPage, {uid: uid});
          }
        },
        {
          text:'Inhabilitar',
          role: 'destructive',
          handler:()=>{
            //Aqui va el codigo 
          } 
        },
        {
          text:'Eliminar',
          role: 'destructive',
          handler:()=>{
           if(confirm('¿Estas seguro de eliminar este usuario?')){
            // this._up.deleteUser();
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
