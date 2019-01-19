import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SucursalAltaProvider, Credenciales } from '../../providers/sucursal-alta/sucursal-alta';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-admin-sucursal-editperfil',
  templateUrl: 'admin-sucursal-editperfil.html',
})
export class AdminSucursalEditperfilPage {
  sucursalItem: Credenciales = {};
  data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sucProv: SucursalAltaProvider,
    public toastCtrl: ToastController,
    public Fiauth: AngularFireAuth

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalEditperfilPage');
    console.log('SUCURSALITEM', this.sucProv.selectedSucursalItem);

  }

  savePerfil(sucursalItem: Credenciales){
    console.log(sucursalItem);

    this.data={
      contacto: this.sucProv.selectedSucursalItem.contacto,
      direccion: this.sucProv.selectedSucursalItem.direccion,
      displayName: this.sucProv.selectedSucursalItem.displayName,
      email: this.sucProv.selectedSucursalItem.email,
      tel: this.sucProv.selectedSucursalItem.tel,
      tipo: this.sucProv.selectedSucursalItem.tipo,
      uid: this.sucProv.selectedSucursalItem.uid
    }
    console.log(this.data);
    this.sucProv.updateProfile(this.data);
    this.navCtrl.pop();

  }
  changePass(email){
 var auth = this.Fiauth.auth;
  email;
    // Email sent.
    if(confirm('¿Estás seguro de que quieres restablecer la contraseña?')){
    auth.sendPasswordResetEmail(email);
     this.mostrar_toast('Se ha enviado un correo para el cambio/restablecimiento de contraseña a '+ email);

        // console.log('Correo enviado a '+ email);
  }
}
mostrar_toast( mensaje: string,  ){

  const toast = this.toastCtrl.create({
     message: mensaje,
     duration: 3000
   }).present();

}

}
