import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from "../pages/perfil/perfil";
import { EventosPage } from "../pages/eventos/eventos";
import { NosotrosPage } from "../pages/nosotros/nosotros";
import { CartaPage } from "../pages/carta/carta";
import { HistorialPage } from "../pages/historial/historial";
import { Reservacion_1Page } from "../pages/reservacion-1/reservacion-1";
import { TabsPage } from "../pages/tabs/tabs";
import { EventoDetallePage } from "../pages/evento-detalle/evento-detalle";
//administrador
import { AdminLoginPage } from "../pages/admin-login/admin-login";
import { AdminHomePage } from "../pages/admin-home/admin-home";
import { AdminUsersPage } from "../pages/admin-users/admin-users";
import { AdminEventoHomePage } from "../pages/admin-evento-home/admin-evento-home";
import { AdminEventoSubirPage } from "../pages/admin-evento-subir/admin-evento-subir";
import { AdminEventoEditPage } from '../pages/admin-evento-edit/admin-evento-edit';
import { AdminCartaHomePage } from "../pages/admin-carta-home/admin-carta-home";
import { AdminCartaEditPage } from '../pages/admin-carta-edit/admin-carta-edit';
import { AdminCartaSubirPage } from '../pages/admin-carta-subir/admin-evento-subir';


//Pipes
import { PipesModule } from "../pipes/pipes.module";


//import { AuthService } from '../providers/auth-service';
//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//providers
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { EventosServiceProvider } from '../providers/eventos-service/eventos-service';
import { CartaAddProvider } from '../providers/carta-add/carta-add';
import { ToastProvider } from '../providers/toast/toast';
import { CargaArchivoCartaProvider } from '../providers/carga-archivo-carta/carga-archivo';


//Plugins
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';


export const firebaseConfig = {
  apiKey: "AIzaSyBixlCb21nNbPSurY-Pvqu3hZB80Icl9Pk",
  authDomain: "guestreservation-8b24b.firebaseapp.com",
  databaseURL: "https://guestreservation-8b24b.firebaseio.com",
  projectId: "guestreservation-8b24b",
  storageBucket: "guestreservation-8b24b.appspot.com",
  messagingSenderId: "853477386824"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PerfilPage,
    TabsPage,
    EventosPage,
    Reservacion_1Page,
    NosotrosPage,
    CartaPage,
    HistorialPage,
    AdminLoginPage,
    AdminHomePage,
    AdminUsersPage,
    AdminEventoHomePage,
    AdminEventoSubirPage,
    AdminCartaHomePage,
    AdminCartaSubirPage,
    AdminCartaEditPage,
    AdminEventoEditPage,
    EventoDetallePage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PerfilPage,
    TabsPage,
    EventosPage,
    Reservacion_1Page,
    NosotrosPage,
    CartaPage,
    HistorialPage,
    AdminLoginPage,
    AdminHomePage,
    AdminUsersPage,
    AdminEventoHomePage,
    AdminEventoSubirPage,
    AdminEventoEditPage,
    AdminCartaHomePage,
    AdminCartaEditPage,
    AdminCartaSubirPage,
    EventoDetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Facebook,
    GooglePlus,
    AuthProvider,
    UserProvider,
    //Camera,
    ImagePicker,
    SocialSharing,
    CargaArchivoProvider,
    EventosServiceProvider,
    CartaAddProvider,
    ToastProvider,
    CargaArchivoCartaProvider
    //AuthService
  ]
})
export class AppModule {}
