import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo"


@Component({
  selector: 'page-admin-evento-subir',
  templateUrl: 'admin-evento-subir.html',
})
export class AdminEventoSubirPage {

  titulo:string = "";
  fecha: string = "";
  hora: string = "";
  categoria: string = "";
  lugar: string = "";
  obs: string = "";
  imagenPreview: string = "";
  imagen64: string = "";


  constructor( private viewCtrl: ViewController,
                //private camera: Camera,
                private imagePicker: ImagePicker,
                public _cap: CargaArchivoProvider) {
  }
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

//   mostrar_camara(){
//     const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   encodingType: this.camera.EncodingType.JPEG,
//   mediaType: this.camera.MediaType.PICTURE
// }
//
// this.camera.getPicture(options).then((imageData) => {
//  // imageData is either a base64 encoded string or a file URI
//  // If it's base64 (DATA_URL):
//  this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
//  this.imagen64 = imageData;
// }, (err) => {
//  // Handle error
//  console.log( "Error en la camara", JSON.stringify(err));
// });
//   }

  seleccionar_foto(){
    let opciones:ImagePickerOptions={
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }
    this.imagePicker.getPictures(opciones).then((results) => {
        for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];


  }
  }, (err) => {
    console.log("Error en selector", JSON.stringify(err))
  });
  }
  crear_post(){
    let archivo ={
      img: this.imagen64,
      titulo: this.titulo,
      fecha: this.fecha,
      hora: this.hora,
      categoria: this.categoria,
      lugar: this.lugar,
      obs: this.obs
    }
    this._cap.cargar_imagen_firebase(archivo)
    .then(()=>this.cerrar_modal());
  }


}
