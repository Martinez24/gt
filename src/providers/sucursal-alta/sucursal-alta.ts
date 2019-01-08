import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase'

@Injectable()
export class SucursalAltaProvider {
    sucursal: Credenciales = {};

  firedata = firebase.database().ref('/sucursales');

  constructor(
    public afireauth: AngularFireAuth,
    public afiredatabase: AngularFireDatabase
  ) {
    console.log('Hello SucursalAltaProvider Provider');
  }

  register(newsucursal){
    return new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newsucursal.email, newsucursal.password).then(() => {
          this.afireauth.auth.currentUser.updateProfile({
              displayName: newsucursal.name,
              photoURL: ''
          }).then(() => {
              this.afiredatabase.list('/sucursales/').update(this.afireauth.auth.currentUser.uid, {
                  uid : this.afireauth.auth.currentUser.uid,
                  displayName : newsucursal.sucursal,
                  contacto: newsucursal.nombrecontacto,
                  direccion: newsucursal.direccion,
                  photoURL: '../assets/imgs/icons/home.png',
                  email: newsucursal.email,
                  password: newsucursal.password,
                  status: 'activo',
                  tipo: newsucursal.tipo,
                  tel: newsucursal.telefono
              }).then((res)=>{
                  console.log(res)
                  resolve({ success: true });
              });
          }).catch((err) => {
              console.log(err);
              reject(err);
          })
      }).catch((err) => {
          console.log(err);
          reject(err);
      })
  })
  }

  cargarSucursal(
                sucursal:string,
                contacto:string,
                direccion:string,
                imagen:string,
                email:string,
                tel:string,
                uid:string
                    ){
                        this.sucursal.sucursal = sucursal;
                        this.sucursal.contacto = contacto;
                        this.sucursal.direccion = direccion;
                        this.sucursal.imagen = imagen;
                        this.sucursal.email = email;
                        this.sucursal.tel = tel;
                        this.sucursal.uid = uid;
                    }
public getSucursal(uid){
    return this.afiredatabase.object('sucursales/'+uid);
}

}
export interface Credenciales{
    uid?:string;
    sucursal?:string;
    contacto?:string;
    direccion?:string;
    imagen?:string;
    email?:string;
    tel?:string;
}