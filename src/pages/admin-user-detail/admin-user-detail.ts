import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the AdminUserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-user-detail',
  templateUrl: 'admin-user-detail.html',
})
export class AdminUserDetailPage {
  user: any={uid: null, nombre: null, email: null, imagen: null,  provider: null, active: null, phoneNumber: null}
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public _cap: UsuarioProvider
     ) 
     {
       this.user.uid = navParams.get('uid');
       _cap.getUser(this.user.uid)
        .valueChanges().subscribe(user=>{
          this.user = user;
        });

  }

  habilitar_user(uid){
    if(confirm('¿Estas seguro de habilitar este usuario?')){
      this._cap.habilitar(uid);
      console.log('Se habilito');
  }
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserDetailPage');
  }

}
