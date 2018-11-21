import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartaAddProvider } from '../../providers/carta-add/carta-add';
import { CartaItem } from '../../providers/carta-add/CartaItem';
//import { AngularFireDatabase } from "angularfire2/database";
//import { ToastProvider } from '../../providers/toast/toast';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
//import { AdminCartaHomePage } from "../admin-carta-home/admin-carta-home";

//import { Observable } from 'rxjs-compat';


@IonicPage()
@Component({
  selector: 'page-admin-carta-add',
  templateUrl: 'admin-carta-add.html',
})
export class AdminCartaAddPage {

  titulo: string = "";
  precio: string = "";
  categoria: string = "";
  nota: string = "";
  imagenPreview: string = "";
  imagen64: string = "";

  // cartaItem: CartaItem={
  //   name: '',
  //   precio: undefined,
  //   categoria: undefined,
  //   img: undefined
  // };

  constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                //private DB: AngularFireDatabase,
                private _Cap: CartaAddProvider,
                private imagePicker: ImagePicker,
               // private toasCtrl: ToastProvider
                ) {
  
    
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

  crear_post(){
    let archivo ={
      img: this.imagen64,
      titulo: this.titulo,
      categoria: this.categoria,
      precio: this.precio,
      nota: this.nota
    }
    this._Cap.cargar_imagen_firebase(archivo);
    this.navCtrl.pop();
  }


//  addCartaItem(cartaItem: CartaItem){
   
//    this.carta.addCarta(cartaItem).then(ref =>{
//     this.toasCtrl.show(`${cartaItem.name} added!`)
//    //this.navCtrl.setRoot('AdminCartaHomePage', {$key: ref.$key});
//    this.navCtrl.pop();
//    })
   
//  }
    // addCartaItem(){
    //   let cartaArchivo ={
    //     img: this.imagen64,
    //     name: this.name,
    //     precio: this.precio,
    //     categoria: this.categoria
    //   }
    // }

}
