import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import   "rxjs/add/operator/map";
import { Observable } from 'rxjs-compat';
import { ArchivoSubir } from './ArchivoSubir';


@Injectable()
export class CargaArchivoProvider {
  
  selectedEventoItem: ArchivoSubir = new ArchivoSubir();

  imagenes: ArchivoSubir[] = [];
  eventos: Observable<any[]>;
  
  //lastKey: string = null;
  

  constructor(public toastCtrl: ToastController,
              //public navCtrl: NavController,              
              public afDB: AngularFireDatabase,
               ) {
    // this.cargar_ultimo_key()
    //     .subscribe(()=>this.cargar_imagenes());

  }
// private cargar_ultimo_key(){
//   return this.afDB.list('/evento', ref=> ref.orderByKey().limitToLast(1))
//             .valueChanges()
//             .map( (evento:any) => {
//               this.lastKey = evento[0].key;
//               this.imagenes.push( evento[0]);
//             });


// }
// cargar_imagenes(){
//   return new Promise ((resolve, reject)=>{
//     this.afDB.list('/evento',
//       ref=> ref.limitToLast(8)
//                 .orderByKey()
//                 .endAt(this.lastKey)
//               ).valueChanges()
//                .subscribe((eventos:any)=>{
//                  eventos.pop();
//               if( eventos.length == 0){
//                 console.log('Ya no hay más registros');
//                 resolve(false);
//                 return;
//               }
//               this.lastKey = eventos[0].key;
//               for( let i = eventos.length-1; i>=0; i--){
//                 let evento = eventos[i];
//                 this.imagenes.push(evento);
//               }
//               resolve(true);
//             });
//   });
// }
cargar_imagen_firebase( archivo:ArchivoSubir  ){

  let promesa = new Promise( (resolve, reject)=>{
    this.mostrar_toast('Cargando..');

    let storeRef = firebase.storage().ref();
    let nombreArchivo:string = new Date().valueOf().toString();

    let uploadTask: firebase.storage.UploadTask =
   storeRef.child(`evento/${ nombreArchivo }.jpg`)
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
                            archivo.fecha,
                            archivo.hora,
                            archivo.categoria,
                            archivo.lugar,
                            archivo.obs,
                            url, nombreArchivo);
            resolve();
});
        }
        )
  });
  return promesa;
}

private crear_post( titulo:string,
                    fecha: string,
                    hora: string,
                    categoria: string,
                    lugar: string,
                    obs: string,
                    url: string,
                    nombreArchivo:string){
  let evento: ArchivoSubir = {
    img:url,
    titulo: titulo,
    fecha: fecha,
    hora: hora,
    categoria: categoria,
    lugar: lugar,
    obs: obs,
    key: nombreArchivo
  };
  console.log( JSON.stringify(evento));
  //this.afDB.list('/evento').push(evento);
  this.afDB.object(`evento/${ nombreArchivo }`).update(evento);
  this.imagenes.push( evento );
  this.mostrar_toast('Evento grabado a BD');
}


 public getEvento(id){
    return this.afDB.object('evento/'+id);
 }

 deleteEvento(key: string, img: string)
{
var storeRef = firebase.storage().ref();
var desertRef = storeRef.child(`evento/${ img }.jpg`);
console.log(img);

// Delete the file
desertRef.delete().then(function() {
  this.mostrar_toast('Finally');
}).catch(function(error) {
  // Uh-oh, an error occurred!
});
this.afDB.database.ref('evento/'+key).remove();       
}

updateEvento(data)
  {
    console.log(data.KEY);
    this.afDB.database.ref('evento/'+data.KEY).update(data);
  }

mostrar_toast( mensaje: string,  ){
  
  const toast = this.toastCtrl.create({
     message: mensaje,
     duration: 3000
   }).present();
 }
// Edicion de imagen 
cargar_imagen_firebase_evento( archivo:Credenciales  ){

  let promesa = new Promise( (resolve, reject)=>{
    this.mostrar_toast('Cargando..');

    let storeRef = firebase.storage().ref();
    let img:string = new Date().valueOf().toString();

    let uploadTask: firebase.storage.UploadTask =
   storeRef.child(`evento/${ img }.jpg`)
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
            uploadTask.snapshot.ref.getDownloadURL().then( urlImage => {
                this.crear_post_edev(archivo.key, urlImage);
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
public crear_post_edev(key, url:string){
  let evento: Credenciales = {
      key: key,
      img: url
  };
  console.log(JSON.stringify(evento));
  this.afDB.object(`evento/`+key).update(evento);
  // this.imagenes.push(sucursal);
  this.mostrar_toast('Imagen actualizada');
}
}
export class Credenciales {
  titulo?: string;
  fecha?: string;
  hora?: string;
  categoria?: string;
  lugar?: string;
  obs?: string;
  img?: string;
  key?: string;
}

