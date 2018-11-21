import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { CartaItem } from './CartaItem';
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import   "rxjs/add/operator/map";


@Injectable()
export class CartaAddProvider {

  cartaList : AngularFireList<any>;
  imagenes: CartaItem[] = [];
  selectedProduct: CartaItem = new CartaItem();


  constructor(
                private DB: AngularFireDatabase,
                public toastCtrl: ToastController
             ) {}

 getCarta()
 {
   return this.cartaList = this.DB.list('bebidas');
 }


  // addCarta(cartaItem: CartaItem ){
  //   return this.cartaList.push(cartaItem);
  // }
  cargar_imagen_firebase( archivo:CartaItem  ){

    let promesa = new Promise( (resolve, reject)=>{
      this.mostrar_toast('Cargando..');
  
      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();
  
      let uploadTask: firebase.storage.UploadTask =
     storeRef.child(`bebidas/${ nombreArchivo }.jpg`)
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
              this.crear_post(archivo.titulo,
                              archivo.precio,
                              archivo.categoria,
                              archivo.nota,
                              url, nombreArchivo);
              resolve();
  });
          }
          )
    });
    return promesa;
  }
  private crear_post( titulo:string,
    precio: string,
    categoria: string,
    nota: string,
    url: string,
    nombreArchivo:string){
let bebida: CartaItem = {
img:url,
titulo: titulo,
precio: precio,
categoria: categoria,
nota: nota,
$key: nombreArchivo
};
console.log( JSON.stringify(bebida));
//this.afDB.list('/evento').push(evento);
this.DB.object(`bebidas/${ nombreArchivo }`).update(bebida);
this.imagenes.push( bebida );
this.mostrar_toast('Evento grabado a BD');
}

  mostrar_toast( mensaje: string ){
    const toast = this.toastCtrl.create({
       message: mensaje,
       duration: 3000
     }).present();
   }

   public getEvento(id){
      return this.DB.object('carta/'+id);      
        
   }

  deleteCarta($key: string)
  {
    this.cartaList.remove($key);
  }

  updateCarta(data)
  {
    console.log(data.KEY);    
    // this.cartaList.update(cartaItem.$key,{
    //   name: cartaItem.name,
    //   categoria: cartaItem.categoria,
    //   precio: cartaItem.precio
    // });
    return this.cartaList.update(data.KEY, data);
  }

  

}

