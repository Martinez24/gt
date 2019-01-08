import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';



@IonicPage()
@Component({
  selector: 'page-admin-sucursal-subir',
  templateUrl: 'admin-sucursal-subir.html',
})
export class AdminSucursalSubirPage {

  credentials: any = {
    sucursal: '',
    nombrecontacto: '',
    direccion: '',
    email: '',
    password: '',
    status: '',
    tipo: '',
    telefono:''

  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public ProSuc: SucursalAltaProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalSubirPage');
  }

  register() {
    var toaster = this.toastCtrl.create({
        duration: 3000,
        position: 'bottom'
    });
    if (this.credentials.email == '' || this.credentials.password == '' || this.credentials.name == '' || this.credentials.sucursal == '' || this.credentials.direccion == '' || this.credentials.tipo == '') {
        toaster.setMessage('Todos los campos son requeridos');
        toaster.present();
    } else if (this.credentials.password.length < 7) {
        toaster.setMessage('La contraseña no es sufucientemente larga, intenta con más de 7 caracteres');
        toaster.present();
    } else {
        let loader = this.loadingCtrl.create({
            content: 'Por favor, espere'
        });
        loader.present();
        this.ProSuc.register(this.credentials).then((res: any) => {
            loader.dismiss();
            localStorage.setItem("isLogin", "true");
            //this.navCtrl.setRoot(HomePage);
            this.navCtrl.pop();
        }).catch((err) => {
            loader.dismiss();
            alert(err.message);
        })
    }
}
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }
}
