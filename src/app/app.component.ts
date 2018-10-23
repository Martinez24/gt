import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from "../pages/tabs/tabs";
import { NosotrosPage } from "../pages/nosotros/nosotros";
import { CartaPage } from "../pages/carta/carta";
import { Reservacion_1Page } from "../pages/reservacion-1/reservacion-1";
import { PerfilPage } from "../pages/perfil/perfil";
import { HistorialPage } from "../pages/historial/historial";
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioProvider } from "../providers/usuario/usuario";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  home = TabsPage;
  nosotros = NosotrosPage;
  carta = CartaPage;
  perfil = PerfilPage;
  historial = HistorialPage;
  reservacion = Reservacion_1Page;


  constructor(platform: Platform,
     statusBar: StatusBar,
      splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public usuarioProv: UsuarioProvider,
    private afAuth: AngularFireAuth) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
//Menu de la aplicacion
  irHome( home:any ){
  console.log( home );
  this.rootPage=home;
  this.menuCtrl.close();
}
  irNosotros( nosotros:any ){
  console.log( nosotros );
  this.rootPage= nosotros;
  this.menuCtrl.close();
}

  irPerfil( perfil:any ){
  console.log( perfil );
  this.rootPage= perfil;
  this.menuCtrl.close();
  }

  irCarta( carta:any ){
  console.log( carta );
  this.rootPage= carta;
  this.menuCtrl.close();
  }

  irHistorial( historial:any ){
  console.log( historial );
  this.rootPage= historial;
  this.menuCtrl.close();
  }

  irReservacion( reservacion:any ){
  console.log( reservacion );
  this.rootPage= reservacion;
  this.menuCtrl.close();
  }

  irLogin( rootPage ){
  console.log( rootPage );
  this.rootPage= rootPage;
  this.menuCtrl.close();
  }
  salir( rootPage ){
    this.afAuth.auth.signOut().then( res => {
      this.usuarioProv.usuario = {};
    this.rootPage= LoginPage;
    this.menuCtrl.close();
    });
  }
}
