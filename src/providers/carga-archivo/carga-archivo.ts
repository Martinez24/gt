import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';
import   "rxjs/add/operator/map";

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  constructor(public toastCtrl: ToastController,
              public afDB: AngularFireDatabase  ) {
    this.cargar_ultimo_key()
        .subscribe(()=>this.cargar_imagenes());

  }
private cargar_ultimo_key(){
  return this.afDB.list('/evento', ref=> ref.orderByKey().limitToLast(1))
            .valueChanges()
            .map( (evento:any) => {
              this.lastKey = evento[0].key;
              this.imagenes.push( evento[0]);
            });


}
cargar_imagenes(){
  return new Promise ((resolve, reject)=>{
    this.afDB.list('/evento',
      ref=> ref.limitToLast(3)
                .orderByKey()
                .endAt(this.lastKey)
              ).valueChanges()
               .subscribe((eventos:any)=>{
                 eventos.pop();
              if( eventos.length == 0){
                console.log('Ya no hay más registros');
                resolve(false);
                return;
              }
              this.lastKey = eventos[0].key;
              for( let i = eventos.length-1; i>=0; i--){
                let evento = eventos[i];
                this.imagenes.push(evento);
              }
              resolve(true);
            });
  });
}
cargar_imagen_firebase( archivo:ArchivoSubir,  ){

  let promesa = new Promise( (resolve, reject)=>{
    this.mostrar_toast('Cargando..');

    let storeRef = firebase.storage().ref();
    let nombreArchivo:string = new Date().valueOf().toString();

    let uploadTask: firebase.storage.UploadTask =
   storeRef.child(`${ nombreArchivo }.jpg`)
   .putString( archivo.img, 'base64', { contentType: 'image/jpeg' } );
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
            uploadTask.snapshot.ref.getDownloadURL().then(( url )=>{
            console.log('nombreArchivo', nombreArchivo);
            console.log('url', url);
            console.log('file.titulo', archivo.titulo);
            this.crear_post(archivo.titulo, url, nombreArchivo);
            resolve();
});
        }
        )
  });
  return promesa;
}

private crear_post( titulo:string, url: string, nombreArchivo:string){
  let evento: ArchivoSubir = {
    img:url,
    titulo: titulo,
    key: nombreArchivo
  };
  console.log( JSON.stringify(evento));
  //this.afDB.list('/evento').push(evento);
  this.afDB.object(`/evento/${ nombreArchivo }`).update(evento);
  this.imagenes.push( evento );


}

mostrar_toast( mensaje: string ){
  const toast = this.toastCtrl.create({
     message: mensaje,
     duration: 3000
   }).present();
 }
}

interface ArchivoSubir{
  titulo:string;
  img: string;
  key?: string;
}
