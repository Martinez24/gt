import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
//import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-admin-users',
  templateUrl: 'admin-users.html',
})
export class AdminUsersPage {

  credentials: any = {
        name: '',
        email: '',
        password: '',
        type: '',
    }

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public userProvider: UserProvider
    ) {  }

  register() {
        var toaster = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
        });
        if (this.credentials.email == '' || this.credentials.password == '' || this.credentials.name == '' || this.credentials.type == '') {
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
            this.userProvider.register(this.credentials).then((res: any) => {
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
