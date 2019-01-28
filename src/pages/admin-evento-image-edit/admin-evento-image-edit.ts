import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AdminEventoSubirPage } from '../admin-evento-subir/admin-evento-subir';



@IonicPage()
@Component({
  selector: 'page-admin-evento-image-edit',
  templateUrl: 'admin-evento-image-edit.html',
})
export class AdminEventoImageEditPage {
imagenPreview: string = "";
imagen64: string = "";
evento = { key: null } 

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private sucProv: CargaArchivoProvider) {
    this.evento.key = navParams.get('key');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEventoImageEditPage');
  }
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
  editarImagen(key){
    let data={
      img: this.imagen64,
      key:key
    }
    this.sucProv.cargar_imagen_firebase_evento(data)
      .then(()=>this.navCtrl.pop);
  }

}
