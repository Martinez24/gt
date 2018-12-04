
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {


usuario: Credenciales = {};

  constructor(
              public afDB: AngularFireDatabase,
              public afireauth: AngularFireAuth
            ) { }

  cargarUsuario(nombre:string,
                email:string,
                imagen:string,
                uid:string,
                provider:string){
              this.usuario.nombre= nombre;  
              this.usuario.email = email;
              this.usuario.imagen= imagen;  
              this.usuario.uid = uid;
              this.usuario.provider = provider; 
                }

                public getUser(uid){
                return this.afDB.object('users_user/'+uid);
                }
}
 
export interface Credenciales {
  nombre?:string;
  email?:string;
  imagen?:string;
  uid?:string;
  provider?:string;
}
