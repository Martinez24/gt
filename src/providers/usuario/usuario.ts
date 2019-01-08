
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from 'firebase';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
data: any = {};

usuario: Credenciales = {};

  constructor(
              public afDB: AngularFireDatabase,
              public afireauth: AngularFireAuth
            ) { }

  cargarUsuario(nombre:string,
                email:string,
                imagen:string,
                uid:string,
                phone: string,
                provider:string){
              this.usuario.nombre= nombre;
              this.usuario.email = email;
              this.usuario.imagen= imagen;
              this.usuario.uid = uid;
              this.usuario.provider = provider;
              this.usuario.phone = phone;
                }

                public getUser(uid){
                return this.afDB.object('users/'+uid);
                }

   inhabilitar(uid){
     console.log(uid);

    this.data ={
      active: false
    }
    this.afDB.database.ref('users/'+ uid).update(this.data);
   }
   habilitar(uid){
    console.log(uid);

   this.data ={
     active: true
   }
   this.afDB.database.ref('users/'+ uid).update(this.data);
  }


}

export interface Credenciales {
  nombre?:string;
  email?:string;
  imagen?:string;
  uid?:string;
  phone?: string;
  provider?:string;
}
