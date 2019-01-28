import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import firebase from 'firebase'
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@Injectable()
export class SucursalAltaProvider {

    sucursal: Credenciales = {};
    imagenes: Credenciales[] = [];
    selectedSucursalItem: Credenciales = new Credenciales();

  firedata = firebase.database().ref('/sucursales');

  constructor(
    public afireauth: AngularFireAuth,
    public afiredatabase: AngularFireDatabase,
    public toastCtrl: ToastController
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
                tel:number,
                uid:string
                    ){
                        this.sucursal.displayName = sucursal;
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

updateProfile(data){
    console.log(data.uid);
    this.afiredatabase.database.ref('sucursales/'+data.uid).update(data);
}
cargar_imagen_firebase( archivo:Credenciales  ){

    let promesa = new Promise( (resolve, reject)=>{
      this.mostrar_toast('Cargando..');

      let storeRef = firebase.storage().ref();
      let photoURL:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
     storeRef.child(`sucursales/${ photoURL }.jpg`)
     .putString( archivo.photoURL, 'base64', { contentType: 'image/jpeg' } );
          uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{},//saber el % cuantos se han subido
            ( error )=>{
            //manejo
            console.log("Error en la carga");
            console.log(JSON.stringify(error));
            this.mostrar_toast(JSON.stringify(error));
            reject();
          },
          ()=>{
            // TODO BIEN!
            console.log('Archivo subido');
            this.mostrar_toast('Imagen cargada correctamente');
            // let url = uploadTask.snapshot.downloadURL;
            // this.crear_post( archivo.titulo, url, nombreArchivo );
            // resolve();
              uploadTask.snapshot.ref.getDownloadURL().then( urlImage => {
                  this.crear_post(archivo.uid, urlImage);
                  this.mostrar_toast('URL'+ urlImage);
              }).catch((error) => {
                  console.log(error);

              });
              resolve();

          }
          )
    });
    return promesa;
  }
public crear_post(uid, url:string){
    let sucursal: Credenciales = {
        uid: uid,
        photoURL: url,

    };
    console.log(JSON.stringify(sucursal));
    this.afiredatabase.object(`sucursales/`+uid).update(sucursal);
    // this.imagenes.push(sucursal);
    this.mostrar_toast('Imagen actualizada');
}

mostrar_toast( mensaje: string,  ){

    const toast = this.toastCtrl.create({
       message: mensaje,
       duration: 3000
     }).present();
   }
}

export class Credenciales{
    uid?:string;
    displayName?:string;
    contacto?:string;
    direccion?:string;
    imagen?:string;
    photoURL?: string;
    email?:string;
    tel?:number;
    tipo?: string;

}
